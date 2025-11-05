import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';

interface HeaderProps {
  onCreateRoom?: () => void;
  onJoinRoom?: () => void;
  onLogout?: () => void;
  showButtons?: boolean;
  showLogout?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onCreateRoom, 
  onJoinRoom, 
  onLogout,
  showButtons = true,
  showLogout = true 
}) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: onLogout, style: 'destructive' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../public/VaporChatLogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
      <View style={styles.rightContainer}>
        {showButtons && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onCreateRoom}>
              <Text style={styles.buttonText}>Create a Room</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={onJoinRoom}>
              <Text style={styles.buttonText}>Join a Room</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {showLogout && onLogout && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  logo: {
    width: 50,
    height: 50,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#cc3333',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cc3333',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Header;

