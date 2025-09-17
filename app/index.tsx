import { setAudioModeAsync, useAudioPlayer } from "expo-audio";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { BellButton, GenericButton } from "../components/buttons";
import { Dropdown } from "../components/Dropdown";

export default function Index() {
  const [selectedBell, setSelectedBell] = useState("bell2");
  const [duration, setDuration] = useState("10");
  const [interval, setInterval] = useState("3");
  
  // Create audio players for each bell
  const bell1Player = useAudioPlayer(require('../assets/sounds/bells/bell1.mp3'));
  const bell2Player = useAudioPlayer(require('../assets/sounds/bells/bell2.mp3'));
  const bell3Player = useAudioPlayer(require('../assets/sounds/bells/bell3.mp3'));

  useEffect(() => {
    setupAudio();
  }, []);

  const setupAudio = async () => {
    await setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: false,
    });
  };

  const playBellSound = async (bellId: string) => {
    // Stop all other bells first
    if (bellId !== "bell1") {
      bell1Player.seekTo(0);
      bell1Player.pause();
    }
    if (bellId !== "bell2") {
      bell2Player.seekTo(0);
      bell2Player.pause();
    }
    if (bellId !== "bell3") {
      bell3Player.seekTo(0);
      bell3Player.pause();
    }
    
    // Play selected bell
    if (bellId === "bell1") {
      bell1Player.seekTo(0);
      bell1Player.play();
    } else if (bellId === "bell2") {
      bell2Player.seekTo(0);
      bell2Player.play();
    } else if (bellId === "bell3") {
      bell3Player.seekTo(0);
      bell3Player.play();
    }
  };

  const pauseAllBells = () => {
    bell1Player.seekTo(0);
    bell1Player.pause();
    bell2Player.seekTo(0);
    bell2Player.pause();
    bell3Player.seekTo(0);
    bell3Player.pause();
  };

  const handleBellPress = (bellId: string) => {
    setSelectedBell(bellId);
    playBellSound(bellId);
  };

  const handleStartPress = () => {
    pauseAllBells();
    router.push({
      pathname: "/meditation",
      params: { bellId: selectedBell, duration, interval }
    });
  };

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#0f0f0f', 
      padding: 24,
      paddingTop: 60
    }}>
      {/* Header */}
      <View style={{ 
        alignItems: 'center',
        marginBottom: 50
      }}>
        <Text style={{ 
          color: 'white', 
          fontSize: 22, 
          fontWeight: '700',
          letterSpacing: 0.5
        }}>
          Timed Meditation
        </Text>
      </View>
      
      {/* Bell Selection */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 30,
        paddingVertical: 20
      }}>
        <BellButton 
          id="bell1"
          isSelected={selectedBell === "bell1"}
          onPress={() => handleBellPress("bell1")}
          soundId="singing_bowl_1"
          image={require('../assets/images/bell1.png')}
        />
        <BellButton 
          id="bell2"
          isSelected={selectedBell === "bell2"}
          onPress={() => handleBellPress("bell2")}
          soundId="singing_bowl_2"
          image={require('../assets/images/bell2.png')}
        />
        <BellButton 
          id="bell3"
          isSelected={selectedBell === "bell3"}
          onPress={() => handleBellPress("bell3")}
          soundId="tibetan_bell"
          image={require('../assets/images/bell3.png')}
        />
      </View>
      
      <Text style={{ 
        color: '#aaa', 
        textAlign: 'center', 
        marginBottom: 50,
        fontSize: 15,
        lineHeight: 22,
        paddingHorizontal: 20
      }}>
        Start and end your meditation session with a sound of the bell.
      </Text>
      
      {/* Settings */}
      <View style={{
      }}>
        <Dropdown
          label="Duration"
          type="duration"
          selectedValue={duration}
          onValueChange={setDuration}
        />
        
        <Dropdown
          label="Interval bells"
          type="interval"
          selectedValue={interval}
          onValueChange={setInterval}
        />
      </View>
      
      {/* Start Button */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
        <GenericButton 
          text="Start"
          onPress={handleStartPress}
        />
      </View>
    </View>
  );
}
