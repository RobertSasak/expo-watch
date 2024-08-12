import { XcodeProject } from '@expo/config-plugins'

export function addPbxGroup(
    xcodeProject: XcodeProject,

    {
        targetName,
        files,
    }: {
        targetName: string
        files: string[]
    },
) {
    const { uuid: pbxGroupUuid } = xcodeProject.addPbxGroup(
        files,
        `"${targetName}"`,
        `"../${targetName}"`,
    )

    const groups = xcodeProject.hash.project.objects['PBXGroup']
    if (pbxGroupUuid) {
        Object.keys(groups).forEach(function (key) {
            if (
                groups[key].name === undefined &&
                groups[key].path === undefined
            ) {
                xcodeProject.addToPbxGroup(pbxGroupUuid, key)
            }
        })
    }
}
