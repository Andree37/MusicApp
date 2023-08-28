import { StyleSheet } from 'react-native';
import { Image, Text, View } from 'tamagui';
import { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';
import { Song } from '@/types/songs';

const swiperColors = ['#4ea821', '#97CAE5', '#e8e423', '#a8214e', '#e5ca97', '#23e8e4'];

function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const url = `${process.env.EXPO_PUBLIC_BACKEND_URL!}/songs?day=${formatDate(new Date())}`;

export default function TabTwoScreen() {
    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => setSongs(data))
            .catch((error) => console.error(error));
    }, []);

    if (songs.length === 0) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <Swiper style={styles.wrapper} showsButtons loop={false}>
            {songs.map((song, index) => {
                return (
                    <View key={index} style={styles.slide1} backgroundColor={swiperColors[index % swiperColors.length]}>
                        {song.album_cover && <Image source={{ uri: song.album_cover, width: 100, height: 100 }} />}
                        <Text style={styles.text}>{song.genre}</Text>
                        <Text style={styles.text}>{song.artist}</Text>
                        <Text style={styles.text}>{song.title}</Text>
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
