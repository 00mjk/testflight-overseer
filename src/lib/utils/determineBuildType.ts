enum BuildType {
    BETA = "beta",
    ALPHA = "alpha",
    NELLY = "nelly"
}

export default function determineBuildType(description: string): BuildType {
    const loweredDescription = description.toLowerCase()

    if (loweredDescription.includes("nelly")) return BuildType.NELLY
    else if (loweredDescription.includes("alpha")) return BuildType.ALPHA
    else if (loweredDescription.includes("beta")) return BuildType.BETA
    else throw new Error("Couldn't determine build type")
}
