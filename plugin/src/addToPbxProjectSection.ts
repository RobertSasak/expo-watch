import { XcodeProject } from '@expo/config-plugins'

export function addToPbxProjectSection(
    xcodeProject: XcodeProject,
    target: { uuid: string },
) {
    xcodeProject.addToPbxProjectSection(target)
    if (
        !xcodeProject.pbxProjectSection()[xcodeProject.getFirstProject().uuid]
            .attributes.TargetAttributes
    ) {
        xcodeProject.pbxProjectSection()[
            xcodeProject.getFirstProject().uuid
        ].attributes.TargetAttributes = {}
    }
    xcodeProject.pbxProjectSection()[
        xcodeProject.getFirstProject().uuid
    ].attributes.TargetAttributes[target.uuid] = {
        LastSwiftMigration: 1250,
    }
}
