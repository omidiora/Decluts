import React, { useState, useRef, useEffect } from 'react';
import { View, Modal, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import BaseComponent from './BaseComponent';

const ModalPicker = ({
    data,
    onChange,
    initValue,
    style,
    optionStyle,
    optionTextStyle,
    sectionStyle,
    sectionTextStyle,
    cancelStyle,
    cancelTextStyle,
    overlayStyle,
    cancelText,
    children,
}) => {
    const [animationType, setAnimationType] = useState('slide');
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState('please select');
    const [modalData, setModalData] = useState([]);
    const modalRef = useRef(null);
    let componentIndex = 0;

    useEffect(() => {
        setSelected(initValue);
        setModalData(data);
    }, [initValue, data]);

    const handleOpen = () => {
        setModalVisible(true);
    };

    const handleClose = () => {
        setModalVisible(false);
    };

    const handleChange = (item) => {
        onChange(item);
        setSelected(item.label);
        handleClose();
    };

    const renderSection = (section) => {
        return (
            <View key={section.key} style={[styles.sectionStyle, sectionStyle]}>
                <Text style={[styles.sectionTextStyle, sectionTextStyle]}>{section.label}</Text>
            </View>
        );
    };

    const renderOption = (option) => {
        return (
            <TouchableOpacity key={option.key} onPress={() => handleChange(option)}>
                <View
                    style={[
                        styles.optionStyle,
                        optionStyle,
                        {
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        },
                    ]}
                >
                    <View style={{ flex: 0.15 }}>
                        <Image source={option.image} resizeMode="stretch" style={{ width: 30, height: 16 }} />
                    </View>
                    <View style={{ flex: 0.7, alignItems: 'center' }}>
                        <Text
                            style={[
                                styles.optionTextStyle,
                                optionTextStyle,
                                { color: '#434343', fontSize: 14 },
                            ]}
                        >
                            {option.label}
                        </Text>
                    </View>
                    <View style={{ flex: 0.15, alignItems: 'flex-end' }}>
                        <Text
                            style={[
                                styles.optionTextStyle,
                                optionTextStyle,
                                { color: 'grey', fontSize: 12 },
                            ]}
                        >
                            {option.dialCode}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderOptionList = () => {
        if (!modalData) {
            return null; // or any other loading indicator or message
        }
    
        const options = modalData.map((item) => {
            if (item.section) {
                return renderSection(item);
            }
            return renderOption(item);
        });
    
        return (
            <View style={[styles.overlayStyle, overlayStyle]} key={`modalPicker${componentIndex++}`}>
                <View style={styles.optionContainer}>
                    <ScrollView keyboardShouldPersistTaps="always">
                        <View style={{ paddingHorizontal: 10 }}>{options}</View>
                    </ScrollView>
                </View>
                <View style={styles.cancelContainer}>
                    <TouchableOpacity onPress={handleClose}>
                        <View style={[styles.cancelStyle, cancelStyle]}>
                            <Text style={[styles.cancelTextStyle, cancelTextStyle]}>{cancelText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    
};

ModalPicker.propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    initValue: PropTypes.string,
    style: PropTypes.any,
    optionStyle: PropTypes.any,
    optionTextStyle: PropTypes.any,
    sectionStyle: PropTypes.any,
    sectionTextStyle: PropTypes.any,
    cancelStyle: PropTypes.any,
    cancelTextStyle: PropTypes.any,
    overlayStyle: PropTypes.any,
    cancelText: PropTypes.string,
    children: PropTypes.node.isRequired,
};

ModalPicker.defaultProps = {
    data: [],
    onChange: () => {},
    initValue: 'Select me!',
    style: {},
    optionStyle: {},
    optionTextStyle: {},
    sectionStyle: {},
    sectionTextStyle: {},
    cancelStyle: {},
    cancelTextStyle: {},
    overlayStyle: {},
    cancelText: 'cancel',
};

export default ModalPicker;
