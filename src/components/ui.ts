import { Text, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import { theme } from '@/src/constant/theme';

// Button Components
export const Button = TouchableOpacity;
export const IconButton = TouchableOpacity;

// Text Components
export const Title = Text;
export const Description = Text;
export const ButtonText = Text;

// Input Components
export const Input = TextInput;

// Container Components
export const Card = View;
export const Container = View;
export const Row = View;
export const Column = View;

// Divider Component
export const Divider = View;

// Badge Component
export const Badge = View;
export const BadgeText = Text;

// List Item Component
export const ListItem = TouchableOpacity;

// Avatar Component
export const Avatar = View;

export const styles = StyleSheet.create({
  // Button Styles
  button: {
    borderRadius: theme.buttons.primary.borderRadius,
    paddingVertical: theme.buttons.primary.paddingVertical,
    paddingHorizontal: theme.buttons.primary.paddingHorizontal,
    backgroundColor: theme.buttons.primary.backgroundColor,
    flexDirection: theme.buttons.primary.flexDirection,
    alignItems: theme.buttons.primary.alignItems,
    elevation: theme.buttons.primary.elevation,
    shadowColor: theme.buttons.primary.shadowColor,
    shadowOffset: theme.buttons.primary.shadowOffset,
    shadowOpacity: theme.buttons.primary.shadowOpacity,
    shadowRadius: theme.buttons.primary.shadowRadius,
    justifyContent: 'center',
  },
  iconButton: {
    padding: theme.spacing.md,
    borderRadius: theme.spacing.sm,
  },

  // Text Styles
  title: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: theme.typography.title.fontWeight,
    color: theme.typography.title.color,
  },
  description: {
    fontSize: theme.typography.description.fontSize,
    color: theme.typography.description.color,
    textAlign: theme.typography.description.textAlign,
  },
  buttonText: {
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
    color: theme.typography.button.color,
  },

  // Input Styles
  input: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.sm,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    width: '100%',
  },

  // Container Styles
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.md,
    padding: theme.spacing.lg,
    margin: theme.spacing.sm,
    elevation: theme.buttons.primary.elevation,
    shadowColor: theme.buttons.primary.shadowColor,
    shadowOffset: theme.buttons.primary.shadowOffset,
    shadowOpacity: theme.buttons.primary.shadowOpacity,
    shadowRadius: theme.buttons.primary.shadowRadius,
  },
  container: {
    flex: theme.containers.centered.flex,
    alignItems: theme.containers.centered.alignItems,
    justifyContent: theme.containers.centered.justifyContent,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  column: {
    flexDirection: 'column',
    gap: theme.spacing.sm,
  },

  // Divider Style
  divider: {
    height: 1,
    backgroundColor: theme.colors.shadow,
    marginVertical: theme.spacing.md,
  },

  // Badge Styles
  badge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    padding: theme.spacing.xs,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // List Item Style
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.shadow,
  },

  // Avatar Style
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
