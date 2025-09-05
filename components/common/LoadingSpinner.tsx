import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Modal,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS } from '../../utils/colors';

type LoadingSpinnerProps = {
  visible?: boolean;
  text?: string;
  overlay?: boolean;
  size?: 'small' | 'large' | number;
  color?: string;
  style?: ViewStyle | TextStyle | Array<ViewStyle | TextStyle>;
};

export default function LoadingSpinner({
  visible = false,
  text = 'Cargando...',
  overlay = false,
  size = 'large',
  color = COLORS.primary,
  style = {},
}: LoadingSpinnerProps) {
  const LoadingContent = () => (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={[styles.text, { color }]}>{text}</Text>}
    </View>
  );

  if (overlay) {
    return (
      <Modal transparent={true} animationType="fade" visible={visible}>
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <LoadingContent />
          </View>
        </View>
      </Modal>
    );
  }

  return visible ? <LoadingContent /> : null;
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
