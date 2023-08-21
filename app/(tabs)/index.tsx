import { StyleSheet } from 'react-native';
import { Button } from 'tamagui';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import useSpotifyAuth from '../../hooks/spotifyAuth';

export default function TabOneScreen() {
    const { response, promptAsync } = useSpotifyAuth();

    console.log(response);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <EditScreenInfo path="app/(tabs)/index.tsx" />
            <Button
                onPress={async () => {
                    await promptAsync();
                }}
            >
                Login
            </Button>
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
