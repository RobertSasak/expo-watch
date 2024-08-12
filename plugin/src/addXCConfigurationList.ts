import { XcodeProject } from '@expo/config-plugins'

interface BuildSettigs {
    [key: string]: string | number
}

export function addXCConfigurationList(
    xcodeProject: XcodeProject,
    {
        targetName,
        buildSettings: buildSettings,
    }: {
        targetName: string
        buildSettings: BuildSettigs
    },
) {
    const buildConfigurationsList = [
        {
            isa: 'XCBuildConfiguration',
            buildSettings,
            name: 'Debug',
        },
        {
            isa: 'XCBuildConfiguration',
            buildSettings,
            name: 'Release',
        },
    ]

    const xCConfigurationList = xcodeProject.addXCConfigurationList(
        buildConfigurationsList,
        'Release',
        `Build configuration list for PBXNativeTarget "${targetName}"`,
    )

    return xCConfigurationList
}
