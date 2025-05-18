import React, { useState, type FC } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable, Dimensions, Platform, StatusBar } from 'react-native';
import { TextInput, HelperText, useTheme, Text } from 'react-native-paper';
import { type CountryItem, CountryPicker } from 'react-native-country-codes-picker';
import { type TextInputComponentProps } from '../types/TextInputComponentProps';
import defaultSelectedCountry from '../constants/DefaultSelectedCountry.json';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TextInputComponent: FC<TextInputComponentProps> = (props) => {
    const [secureTextEntry, setSecureTextEntry] = useState(props.secureTextEntry === true || false);
    const theme = useTheme();
    const shouldShowErrorText = (errorText: string | null | undefined): boolean => {
        return errorText !== null && errorText !== undefined && errorText.length > 0;
    };
    const [selectedCountry, setSelectedCountry] = useState<CountryItem>(defaultSelectedCountry);
    const [showCCP, setShowCCP] = useState(false);
    const insets = useSafeAreaInsets();
    const modalHeight = Platform.OS === 'ios'
        ? Dimensions.get('screen').height -
        (StatusBar.currentHeight ?? 0 + insets.top)
        : '100%';



    return (
        <Pressable onPress={props.onPress}>
            <View style={[props.style, { overflow: 'hidden' }]}>
                {props.customLabel !== null && props.customLabel !== undefined && (
                    <View
                        style={[
                            // eslint-disable-next-line react-native/no-inline-styles
                            { marginBottom: 4, flexDirection: 'row' },
                            props.labelContainerStyle,
                        ]}
                    >
                        <Text style={[props.customLabelStyle]}>
                            {props.customLabel}{' '}
                        </Text>
                        {props.isRequired === true && (
                            // eslint-disable-next-line react-native/no-inline-styles
                            <HelperText type="error" style={{ fontSize: 18 }} >
                                *
                            </HelperText>
                        )}
                    </View>
                )}
                <View style={styles.rowStyle}>
                    {props.selectedCountry !== undefined && props.selectedCountry !== null && (
                        <TouchableOpacity
                            style={[
                                styles.countryPickerStyle,
                                { borderColor: theme.colors.outline },
                            ]}
                            onPress={() => {
                                setShowCCP(true);
                            }}
                        >
                            <View style={styles.countryCodeContainer}>
                                {/* Flag Icon */}
                                <Text style={styles.flag}>{selectedCountry?.flag}</Text>
                                {/* Country Code */}
                                <Text style={styles.code}>{selectedCountry?.dial_code}</Text>
                            </View>
                            <CountryPicker
                                lang="en"
                                show={showCCP}
                                pickerButtonOnPress={(item) => {
                                    if (props.onCountrySelect != null) {
                                        props?.onCountrySelect(item);
                                        setSelectedCountry(item);
                                        setShowCCP(false);
                                    }
                                }}
                                style={{
                                    // Styles for whole modal [View]
                                    modal: {
                                        height: modalHeight,
                                        backgroundColor: theme.colors.background,
                                    },
                                    itemsList: {
                                        paddingHorizontal: 4,
                                        marginRight: 4,
                                        borderColor: theme.colors.outline,
                                    },
                                    textInput: {
                                        height: 60,
                                        paddingHorizontal: 10,
                                        borderWidth: 1,
                                        marginRight: 4,
                                        borderRadius: 10,
                                        borderColor: theme.colors.outline,
                                        backgroundColor: theme.colors.background,
                                        color: theme.colors.onSurface,
                                    },
                                    // Styles for country button [TouchableOpacity]
                                    countryButtonStyles: {
                                        height: 70,
                                        backgroundColor: theme.colors.inverseOnSurface,
                                    },
                                    // Styles for search message container [View]
                                    countryMessageContainer: {},
                                    // Flag styles [Text]
                                    flag: {
                                        fontSize: 22,
                                    },
                                    // Dial code styles [Text]
                                    dialCode: {
                                        fontSize: 17,
                                        color: theme.colors.onSurface,
                                    },
                                    // Country name styles [Text]
                                    countryName: {
                                        fontSize: 17,
                                        color: theme.colors.onSurface,
                                    },
                                }}
                            />
                        </TouchableOpacity>
                    )}
                    <TextInput
                        // placeholderTextColor={theme.colors.placeholderTextColor}
                        placeholder={props.placeholder}
                        onBlur={props.onBlur}
                        label={
                            props.label !== undefined ? (
                                <Text>
                                    {props.label}
                                    {(props.isRequired ?? false) ? (
                                        <Text style={{ color: theme.colors.error }}> *</Text>
                                    ) : null}
                                </Text>
                            ) : undefined
                        }
                        value={props.value}
                        disabled={props.disabled ?? false}
                        defaultValue={props.value?.toString()}
                        error={!(props.errorText == null)}
                        maxLength={props.maxLength}
                        multiline={props.multiline ?? false}
                        numberOfLines={props.numberOfLines}
                        inputMode={props.inputMode}
                        outlineStyle={props.outlineStyle}
                        secureTextEntry={secureTextEntry}
                        contentStyle={[{ textAlign: 'auto' }, props.contentStyle]}
                        style={{ flex: 1 }}
                        onChange={props.onChange}
                        onChangeText={(text) => props.onChangeText?.(text)}
                        onPress={props.onPress}
                        right={
                            props.right !== undefined
                                ? props.right
                                : props.secureTextEntry !== undefined && (
                                    <TextInput.Icon
                                        icon={secureTextEntry ? 'eye' : 'eye-off'}
                                        onPress={() => {
                                            setSecureTextEntry(!secureTextEntry);
                                        }}
                                    />
                                )
                        }
                        left={props.left}
                        mode={props.mode}
                        returnKeyType="done"
                    />
                </View>
                {shouldShowErrorText(props.errorText) &&
                    <HelperText
                        style={{
                            marginStart:
                                props.selectedCountry != null &&
                                    props.selectedCountry !== undefined
                                    ? '30%'
                                    : 0,
                        }}
                        type="error"
                    >
                        {props.errorText}
                    </HelperText>}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    countryPickerStyle: {
        paddingHorizontal: 4,
        height: 50,
        borderWidth: 1,
        justifyContent: 'center',
        marginRight: 4,
        borderRadius: 4,
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    countryCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    flag: {
        marginRight: 5,
        fontSize: 20,
    },
    code: {
        fontSize: 16,
    },
});

export default TextInputComponent;
