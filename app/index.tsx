import { Dropdown } from "@/components/Dropdown";
import { Audio } from "expo-av";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { BellButton, GenericButton } from "../components/buttons";

export default function Index() {
  const [selectedBell, setSelectedBell] = useState("bell2");
  const [duration, setDuration] = useState("10");
  const [interval, setInterval] = useState("3");
  const [sounds, setSounds] = useState<{[key: string]: Audio.Sound}>({});

  useEffect(() => {
    loadSounds();
    return () => {
      // Cleanup sounds when component unmounts
      Object.values(sounds).forEach(sound => {
        if (sound) {
          sound.unloadAsync();
        }
      });
    };
  }, []);

  const loadSounds = async () => {
    try {
      const soundFiles = {
        bell1: require('../assets/sounds/bell1.mp3'),
        bell2: require('../assets/sounds/bell2.mp3'),
        bell3: require('../assets/sounds/bell3.mp3'),
      };

      const loadedSounds: {[key: string]: Audio.Sound} = {};
      
      for (const [bellId, soundFile] of Object.entries(soundFiles)) {
        const { sound } = await Audio.Sound.createAsync(soundFile);
        loadedSounds[bellId] = sound;
      }
      
      setSounds(loadedSounds);
    } catch (error) {
      console.log('Error loading sounds:', error);
    }
  };

  const playBellSound = async (bellId: string) => {
    try {
      const sound = sounds[bellId];
      if (sound) {
        await sound.replayAsync();
      }
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const handleBellPress = (bellId: string) => {
    setSelectedBell(bellId);
    playBellSound(bellId);
  };

  const handleStartPress = () => {
    // Navigate to meditation page with data props
    router.push({
      pathname: "/meditation",
      params: {
        bellId: selectedBell,
        duration: duration,
        interval: interval,
        soundId: selectedBell === "bell1" ? "singing_bowl_1" : 
                 selectedBell === "bell2" ? "singing_bowl_2" : "tibetan_bell"
      }
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
          image={require('../assets/images/bell.png')}
        />
        <BellButton 
          id="bell2"
          isSelected={selectedBell === "bell2"}
          onPress={() => handleBellPress("bell2")}
          soundId="singing_bowl_2"
          image={require('../assets/images/bell.png')}
        />
        <BellButton 
          id="bell3"
          isSelected={selectedBell === "bell3"}
          onPress={() => handleBellPress("bell3")}
          soundId="tibetan_bell"
          image={require('../assets/images/bell.png')}
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
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <GenericButton 
          text="Start"
          onPress={handleStartPress}
        />
      </View>
    </View>
  );
}
