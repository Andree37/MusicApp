import {Button, Input, XStack} from "tamagui";

export default function Three() {
    return <XStack alignItems="center" space="$2">
        <Input flex={1} size="$4" placeholder={`Size ${4}...`}/>
        <Button size={"$4"}>Go</Button>
    </XStack>

}
