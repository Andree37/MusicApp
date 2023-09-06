import { StyleSheet } from 'react-native';
import { Image, Text, View } from 'tamagui';
import { useContext, useState } from 'react';
import AuthContext from '@/providers/authContext';
import { Recommendations } from '@/hooks/spotifyGenreRecommendations';
import Swiper from 'react-native-swiper';

const swiperColors = ['#4ea821', '#97CAE5', '#e8e423', '#a8214e', '#e5ca97', '#23e8e4'];
export default function TabOneScreen() {
    const { authToken } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState<Recommendations[]>([]);

    // useEffect(() => {
    //     async function a() {
    //         if (authToken?.type !== 'success') return;
    //         const recommendations = await useSpotifyGenreRecommendations(authToken.authentication?.accessToken || '');
    //         setRecommendations(recommendations);
    //     }
    //
    //     a();
    // }, []);

    if (recommendations.length === 0) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <Swiper style={styles.wrapper} showsButtons loop={false}>
            {recommendations.map((recommendation, index) => {
                return (
                    <View key={index} style={styles.slide1} backgroundColor={swiperColors[index % swiperColors.length]}>
                        {recommendation.song?.album && (
                            <Image
                                source={{ uri: recommendation.song?.album.images[0].url, width: 100, height: 100 }}
                            />
                        )}
                        <Text style={styles.text}>{recommendation.genre}</Text>
                        <Text style={styles.text}>{recommendation.song?.name}</Text>
                    </View>
                );
            })}
        </Swiper>
    );
}

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8e423',
    },
    text: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
    },
});
