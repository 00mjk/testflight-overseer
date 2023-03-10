declare interface Trains {
    data:  Train[];
    error: null;
};

declare interface Train {
    buildCount:   number;
    trainVersion: string;
};

declare interface Builds {
    data:  Build[];
    error: null;
}

declare interface Build {
    appAdamId:                  number;
    buildVariant:               BuildVariant;
    bundleId:                   string;
    cfBundleShortVersion:       string;
    cfBundleVersion:            string;
    ciBuildGroupId:             null;
    clipInvocationUrls:         null;
    compatibilityInstructions:  string;
    compatibilityInstructions2: string;
    compatibilityStatement:     string;
    compatible:                 boolean;
    deviceFamilyInfo:           DeviceFamilyInfo[];
    embeddedBuilds:             any[];
    expiration:                 string;
    externalVersionId:          null;
    fileSize:                   number;
    hardwareCompatible:         boolean;
    hasMessagesExtension:       boolean;
    hasStickers:                boolean;
    iconAssetToken:             string;
    iconLargeAssetToken:        string;
    iconLargeUrl:               string;
    iconLayeredUrl:             string;
    iconUrl:                    string;
    id:                         number;
    lastModified:               string;
    latestAvailableBuild:       boolean;
    launchProhibited:           boolean;
    macBuildCompatibility:      null;
    messagesIconAssetToken:     null;
    messagesIconUrl:            null;
    name:                       string;
    osCompatible:               boolean;
    permission:                 null;
    platform:                   string;
    platformCompatible:         boolean;
    platformName:               string;
    providerId:                 number;
    providerName:               string;
    releaseDate:                string;
    subBundles:                 null;
    universal:                  boolean;
    uploadDate:                 string;
    watchOnly:                  boolean;
    whatsNew:                   string;
}

declare interface BuildVariant {
    betaExternalVersionId: number;
    bundleId:              string;
    compressionMethod:     string;
    deviceModelName:       null;
    externallyCompressed:  boolean;
    osVersion:             string;
    type:                  string;
    variantId:             string;
}

declare interface DeviceFamilyInfo {
    iconUrl: string;
    name:    string;
    number:  number;
}
