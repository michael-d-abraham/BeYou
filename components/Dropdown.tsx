import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type DropdownProps = {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  type: 'duration' | 'interval';
};

const DURATION_OPTIONS = [
  { label: "1 minutes", value: "1" },
  { label: "5 minutes", value: "5" },
  { label: "10 minutes", value: "10" },
  { label: "15 minutes", value: "15" },
  { label: "20 minutes", value: "20" },
  { label: "30 minutes", value: "30" },
  { label: "45 minutes", value: "45" },
  { label: "60 minutes", value: "60" },
];

const INTERVAL_OPTIONS = [
  { label: "No interval bells", value: "0" },
  { label: "every 1 min", value: "1" },
  { label: "every 2 min", value: "2" },
  { label: "every 3 min", value: "3" },
  { label: "every 5 min", value: "5" },
  { label: "every 10 min", value: "10" },
];

export const Dropdown = ({ label, selectedValue, onValueChange, type }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const options = type === 'duration' ? DURATION_OPTIONS : INTERVAL_OPTIONS;
  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.button}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{selectedOption?.label}</Text>
        <Text style={styles.chevron}>▼</Text>
      </Pressable>
      
      {isOpen && (
        <View style={styles.options}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {options.map((option) => (
              <Pressable
                key={option.value}
                style={styles.option}
                onPress={() => {
                  onValueChange(option.value);
                  setIsOpen(false);
                }}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  label: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  },
  value: {
    color: '#ff6b35',
    fontSize: 17,
    fontWeight: '600',
  },
  chevron: {
    color: '#888',
    fontSize: 14,
  },
  options: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginTop: 4,
    zIndex: 99999,
    elevation: 99999,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  scrollView: {
    maxHeight: 200,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});
