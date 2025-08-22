import { StyleSheet } from 'react-native';

export const COLORS = {
  azul: '#1E3A8A',
  verde: '#10B981',
  rojo: '#EF4444',
  grisClaro: '#F3F4F6',
  blanco: '#FFFFFF',
};

export const FONTS = {
  title: 'Montserrat',
  text: 'Open Sans',
};

export const GLOBAL_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grisClaro,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 15,
    color: COLORS.azul,
    fontFamily: FONTS.title,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.azul,
    fontFamily: FONTS.title,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.azul,
    textAlign: 'center',
    fontFamily: FONTS.text,
  },
  timer: {
    fontSize: 48,
    marginBottom: 30,
    color: COLORS.azul,
    fontFamily: FONTS.title,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    marginBottom: 20,
  },
  navButtons: {
    width: 250,
  },
});
