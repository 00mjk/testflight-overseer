import { EmbedBuilder, WebhookClient } from "discord.js";
import { readFile, writeFile } from "fs/promises";
import fetch from "node-fetch";
import { filesize } from "filesize";
import { BUILD_TYPE_COLOR_MAP } from "./lib/constants.js";
import determineBuildType from "./lib/utils/determineBuildType.js";

const ACCOUNT_ID = process.env.ACCOUNT_ID as string;

const HEADERS = JSON.parse(process.env.HEADERS as string);

const webhook = new WebhookClient({ url: process.env.WEBHOOK as string })

let dataTrains: Train[];

try {
    dataTrains = JSON.parse(await readFile('data/trains.json', 'utf8'));
} catch {
    dataTrains = [];
};

console.log("Fetching trains")
const trains = await (await fetch(`https://testflight.apple.com/v2/accounts/${ACCOUNT_ID}/apps/985746746/platforms/ios/trains`, { headers: HEADERS })).json() as Trains

for (const train of trains.data.reverse()) {
    const dataTrain = dataTrains.find((dataTrain) => train.trainVersion === dataTrain.trainVersion);

    if (!dataTrain || train.buildCount > dataTrain.buildCount) {
        console.log(`Fetching builds for ${train.trainVersion}`)
        const builds = await (await fetch(`https://testflight.apple.com/v2/accounts/${ACCOUNT_ID}/apps/985746746/platforms/ios/trains/${train.trainVersion}/builds`, {
            headers: HEADERS
        })).json() as Builds

        for (const build of builds.data.reverse()) {
            try {
                await readFile(`data/builds/${build.cfBundleVersion}.json`, 'utf8')
                continue
            } catch { }

            console.log(`Found build ${build.cfBundleVersion}`)

            const buildData = {
                version: build.cfBundleShortVersion,
                build: build.cfBundleVersion,
                description: build.whatsNew,
                upload: new Date(build.uploadDate),
                release: new Date(build.releaseDate),
                expiration: new Date(build.expiration),
                size: build.fileSize
            }

            const buildEmbed = new EmbedBuilder({
                author: {
                    name: build.name
                },
                thumbnail: {
                    url: build.iconLargeUrl
                },
                title: `New build released - ${buildData.version} (${buildData.build})`,
                description: buildData.description,
                fields: [
                    {
                        name: "Uploaded",
                        value: `<t:${buildData.upload.getTime() / 1000 | 0}:F>`,
                        inline: true
                    },
                    {
                        name: "Expires",
                        value: `<t:${buildData.expiration.getTime() / 1000 | 0}:F>`,
                        inline: true
                    },
                    {
                        name: "Filesize",
                        value: filesize(buildData.size) as string,
                        inline: true
                    }
                ],
                timestamp: buildData.release,
                footer: {
                    text: build.bundleId
                },
            });

            try {
                const buildType = determineBuildType(buildData.description)
                buildEmbed.setColor(BUILD_TYPE_COLOR_MAP[buildType])
            } catch {
                buildEmbed.setColor(BUILD_TYPE_COLOR_MAP.unknown)
            }

            await webhook.send({ embeds: [buildEmbed] });


            await writeFile(`data/builds/${build.cfBundleVersion}.json`, JSON.stringify(buildData, null, 4))
        }
    }

    if (!dataTrain) {
        dataTrains.push(train);
    } else {
        dataTrain.buildCount = train.buildCount
    }
}

await writeFile("data/trains.json", JSON.stringify(dataTrains, null, 4))
