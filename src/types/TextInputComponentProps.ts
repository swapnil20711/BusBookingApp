import {
  type TextStyle,
  type InputModeOptions,
  type StyleProp,
  type ViewStyle,
  type NativeSyntheticEvent,
  type TextInputChangeEventData,
} from 'react-native';
import {type CountryItem} from 'react-native-country-codes-picker';
import {type TextInputLabelProp} from 'react-native-paper/lib/typescript/components/TextInput/types';
import type React from 'react';

export interface TextInputComponentProps {
  label?: TextInputLabelProp | undefined;
  isRequired?: boolean;
  value: string | undefined;
  placeholder: string | undefined;
  errorText?: string | null;
  maxLength?: number;
  numberOfLines?: number;
  contentStyle?: StyleProp<TextStyle>;
  inputMode: InputModeOptions | undefined;
  outlineStyle?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  multiline?: boolean;
  onChangeText?: (text: string) => void;
  onChange?:
    | ((e: NativeSyntheticEvent<TextInputChangeEventData>) => void)
    | undefined;
  onCountrySelect?: (country: CountryItem) => void;
  onBlur?: (args: any) => void;
  selectedCountry?: CountryItem;
  mode?: 'flat' | 'outlined' | undefined;
  style?: object | undefined;
  right?: React.ReactNode;
  left?: React.ReactNode;
  customLabel?: string;
  labelContainerStyle?: ViewStyle;
  disabled?: boolean;
  onPress?: () => void;
  showCustomErrorMessage?: boolean;
  customLabelStyle?: TextStyle;
  onSubmitEditing?: () => void;
}
