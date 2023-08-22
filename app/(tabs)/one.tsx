import { StyleSheet } from 'react-native';
import { Button, Text, useTheme, View } from 'tamagui';

import EditScreenInfo from '@/components/EditScreenInfo';

export default function TabOneScreen() {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Text color={theme.orange12} style={styles.title}>
                Tab One
            </Text>
            <View style={styles.separator} />
            <EditScreenInfo path="app/(tabs)/index.tsx" />
            <Button onPress={async () => {}}>Login</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
