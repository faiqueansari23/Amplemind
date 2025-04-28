import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity ,Image} from 'react-native';
import Collapsible from 'react-native-collapsible';

const Mernstack = () => {
    const [activeSections, setActiveSections] = useState([]);

    const handleToggleSection = (section) => {
        setActiveSections((prevSections) =>
            prevSections.includes(section)
                ? prevSections.filter((item) => item !== section)
                : [...prevSections, section]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.mernMain}>
            <Text style={styles.title}>Full Stack Web Development [ MERN ]</Text>

            <View style={styles.row}>
                <View style={styles.mernLeft}>
                    <Image source={require('../course_img/MERN.png')} style={styles.mernImage} />
                </View>
                <View style={styles.mernRight}>
                    <Text style={styles.text}>
                        The MERN stack, which stands for MongoDB, Express.js, React.js, and Node.js, is a popular JavaScript stack used for building modern web applications.
                    </Text>
                </View>
            </View>

            <Text style={styles.syslabusHead}>MERN Stack Syllabus</Text>

            {['HTML', 'CSS', 'JavaScript', 'JQuery', 'Bootstrap', 'React js', 'Node js', 'Express Js', 'MongoDB', 'SQL'].map((item, index) => (
                <View key={index}>
                    <TouchableOpacity onPress={() => handleToggleSection(index)}>
                        <Text style={styles.accordionTitle}>{item}</Text>
                    </TouchableOpacity>
                    <Collapsible collapsed={!activeSections.includes(index)}>
                        <View style={styles.accordionContent}>
                            <Text style={styles.accordionText}>{item} content goes here</Text>
                        </View>
                    </Collapsible>
                </View>
            ))}

            <View style={styles.svgContainer}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mernMain: {
        backgroundColor: 'black',
        paddingBottom: 100,
        paddingTop: 120,
        paddingHorizontal: 20,
    },
    title: {
        color: 'rgb(111, 168, 41)',
        textAlign: 'center',
        fontSize: 40,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    mernLeft: {
        flex: 1,
        padding: '3%',
    },
    mernImage: {
        width: '100%',
        height: 'auto',
        shadowColor: '#222222',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    mernRight: {
        flex: 2,
        padding: '3%',
    },
    text: {
        color: 'white',
    },
    list: {
        color: 'white',
    },
    syslabusHead: {
        color: 'rgb(111, 168, 41)',
        padding: '3%',
        textAlign: 'center',
        fontSize: 24,
    },
    svgContainer: {
        width: '100%',
        height: 100,
    },
    accordionTitle: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgb(111, 168, 41)',
    },
    accordionContent: {
        paddingLeft: 20,
    },
    accordionText: {
        color: 'white',
        paddingVertical: 5,
    },
});

export default Mernstack;
