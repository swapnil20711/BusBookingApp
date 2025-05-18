import DatePicker from 'react-native-date-picker';

interface DatePickerModalProps {
    visible: boolean
    onClose: () => void
    onConfirm: (date: Date) => void
    selectedDate: Date
    maxDate: Date
}
const DatePickerModal: React.FC<DatePickerModalProps> = ({ visible, onClose, onConfirm, selectedDate, maxDate }) => {

    return (
        <DatePicker
            mode="date"
            open={visible}
            modal
            date={selectedDate}
            onCancel={() => {
                onClose()
            }}
            onConfirm={(date) => {
                onConfirm(date);
                onClose();
            }}
            maximumDate={maxDate}
        />
    );
};

export default DatePickerModal;
