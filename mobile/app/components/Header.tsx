import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  
  const handleLogout = () => {
    setMenuVisible(false);
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: onLogout, style: 'destructive' },
      ]
    );
  };

  const handleCreateRoom = () => {
    setMenuVisible(false);
    onCreateRoom?.();
  };

  const handleJoinRoom = () => {
    setMenuVisible(false);
    onJoinRoom?.();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/VaporChatLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>VaporChat</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={() => setMenuVisible(true)}
      >
        <View style={styles.hamburgerIcon}>
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </View>
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuDropdown}>
            {showButtons && onCreateRoom && (
              <TouchableOpacity 
                key="create-room"
                style={styles.menuItem}
                onPress={handleCreateRoom}
              >
                <Text style={styles.menuItemText}>Create a Room</Text>
              </TouchableOpacity>
            )}
            
            {showButtons && onJoinRoom && (
              <TouchableOpacity 
                key="join-room"
                style={styles.menuItem}
                onPress={handleJoinRoom}
              >
                <Text style={styles.menuItemText}>Join a Room</Text>
              </TouchableOpacity>
            )}
            
            {showLogout && onLogout && (
              <TouchableOpacity 
                key="logout"
                style={[styles.menuItem, styles.logoutMenuItem]}
                onPress={handleLogout}
              >
                <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  menuButton: {
    padding: 8,
  },
  hamburgerIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 80,
    paddingRight: 20,
  },
  menuDropdown: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    minWidth: 180,
    overflow: 'hidden',
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d2d2d',
  },
  menuItemText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutMenuItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#ff4444',
    fontWeight: '600',
  },
});

export default Header;

