import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Message } from '../types';
import { roomApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import socketService from '../services/socket';
import GradientButton from '../components/GradientButton';
import Header from '../components/Header';

type ChatRoomNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChatRoom'>;
type ChatRoomRouteProp = RouteProp<RootStackParamList, 'ChatRoom'>;

interface Props {
  navigation: ChatRoomNavigationProp;
  route: ChatRoomRouteProp;
}

const ChatRoomScreen: React.FC<Props> = ({ navigation, route }) => {
  const { roomId, roomName, displayName } = route.params;
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadMessages();
    joinRoom();

    // Socket listeners
    socketService.onReceiveMessage((message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });

    socketService.onRoomVaporized(() => {
      setMessages([]);
      Alert.alert('Room Vaporized', 'All messages have been deleted');
    });

    socketService.onUserJoined((data) => {
      console.log(`${data.displayName} joined the room`);
    });

    socketService.onUserLeft((data) => {
      console.log(`${data.displayName} left the room`);
    });

    socketService.onError((error) => {
      Alert.alert('Error', error.message);
    });

    return () => {
      leaveRoom();
      socketService.removeAllListeners();
    };
  }, []);

  const loadMessages = async () => {
    try {
      const response = await roomApi.getRoomMessages(roomId);
      setMessages(response.messages);
      setTimeout(scrollToBottom, 100);
    } catch (error: any) {
      Alert.alert('Error', 'Failed to load messages');
    }
  };

  const joinRoom = () => {
    socketService.joinRoom(roomId, displayName);
  };

  const leaveRoom = () => {
    socketService.leaveRoom(roomId, displayName);
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    socketService.sendMessage(roomId, inputText.trim(), displayName);
    setInputText('');
  };

  const handleVaporize = () => {
    Alert.alert(
      'Vaporize History',
      'Are you sure you want to delete all messages? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Vaporize',
          style: 'destructive',
          onPress: async () => {
            try {
              await roomApi.vaporizeRoom(roomId);
              socketService.vaporizeRoom(roomId);
            } catch (error) {
              Alert.alert('Error', 'Failed to vaporize room');
            }
          },
        },
      ]
    );
  };

  const handleExitRoom = () => {
    navigation.navigate('Home');
  };

  const handleLogout = () => {
    leaveRoom(); // Leave room before logging out
    logout();
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isOwnMessage = item.userId === user?.id;

    return (
      <View
        style={[
          styles.messageContainer,
          isOwnMessage ? styles.ownMessage : styles.otherMessage,
        ]}
      >
        <Text style={[
          styles.displayName,
          isOwnMessage ? styles.ownDisplayName : styles.otherDisplayName
        ]}>
          {item.displayName}
        </Text>
        <View
          style={[
            styles.messageBubble,
            isOwnMessage ? styles.ownBubble : styles.otherBubble,
          ]}
        >
          <Text style={styles.messageText}>{item.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Header
        showButtons={false}
        onLogout={handleLogout}
      />
      
      <View style={styles.roomHeader}>
        <Text style={styles.roomName}>You Are Now in Room: {roomName}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => item.id || `message-${item.userId}-${item.timestamp}-${index}`}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={scrollToBottom}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#666666"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={1000}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.buttonRow}>
          <View style={styles.buttonWrapper}>
            <GradientButton
              title="Exit Room"
              onPress={handleExitRoom}
              variant="secondary"
            />
          </View>
          <View style={styles.buttonWrapper}>
            <GradientButton
              title="Vaporize"
              onPress={handleVaporize}
              variant="primary"
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  roomHeader: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  roomName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  messagesList: {
    padding: 16,
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  ownMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  displayName: {
    color: '#999999',
    fontSize: 12,
    marginBottom: 4,
    marginHorizontal: 12,
  },
  ownDisplayName: {
    textAlign: 'right',
  },
  otherDisplayName: {
    textAlign: 'left',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '100%',
  },
  ownBubble: {
    backgroundColor: '#3366cc',
  },
  otherBubble: {
    backgroundColor: '#1a1a1a',
  },
  messageText: {
    color: '#ffffff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#3366cc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionsContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 32,
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonWrapper: {
    flex: 1,
  },
});

export default ChatRoomScreen;

