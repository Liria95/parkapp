import { StyleSheet } from 'react-native';
import { COLORS } from '../utils/colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderColor: COLORS.primary,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 23,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonTextPrimary: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.gray,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    backgroundColor: COLORS.white,
    fontSize: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saldoCard: {
    background: 'linear-gradient(135deg, #72C8A8 0%, #2E7BDC 100%)',
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  saldoAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  }
});