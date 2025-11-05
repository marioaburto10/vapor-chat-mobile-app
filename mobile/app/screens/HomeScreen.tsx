import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { roomApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VaporInput from '../components/VaporInput';
import GradientButton from '../components/GradientButton';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');
  
  // Form states
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    if (!roomName || !password || !displayName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (roomName.length < 3) {
      Alert.alert('Error', 'Room name must be at least 3 characters');
      return;
    }

    if (password.length < 4) {
      Alert.alert('Error', 'Room password must be at least 4 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await roomApi.createRoom(roomName.trim(), password);
      
      // Navigate to chat room
      navigation.navigate('ChatRoom', {
        roomId: response.room.id,
        roomName: response.room.roomName,
        displayName: displayName.trim(),
      });

      // Clear form
      setRoomName('');
      setPassword('');
      setDisplayName('');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!roomName || !password || !displayName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await roomApi.joinRoom(roomName.trim(), password);
      
      // Navigate to chat room
      navigation.navigate('ChatRoom', {
        roomId: response.room.id,
        roomName: response.room.roomName,
        displayName: displayName.trim(),
      });

      // Clear form
      setRoomName('');
      setPassword('');
      setDisplayName('');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to join room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        onCreateRoom={() => setActiveTab('create')}
        onJoinRoom={() => setActiveTab('join')}
        onLogout={logout}
      />

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/VaporChatLogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>
            {activeTab === 'create' ? 'Create a Room' : 'Join a Room'}
          </Text>

          <View style={styles.formContainer}>
            <VaporInput
              placeholder="Specify Room Name"
              value={roomName}
              onChangeText={setRoomName}
              autoCapitalize="none"
            />

            <VaporInput
              placeholder="Specify Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <VaporInput
              placeholder="Specify Your Display Name"
              value={displayName}
              onChangeText={setDisplayName}
            />

            <GradientButton
              title={activeTab === 'create' ? 'Create' : 'Join'}
              onPress={activeTab === 'create' ? handleCreateRoom : handleJoinRoom}
              loading={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 32,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
});

export default HomeScreen;

