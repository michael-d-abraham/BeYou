import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { BellButton, GenericButton } from "../components/buttons";

export default function Index() {
  const [selectedBell, setSelectedBell] = useState("bell2");

  const handleBellPress = (bellId: string) => {
    setSelectedBell(bellId);
    // TODO: Play sound based on bellId
    console.log("Selected bell:", bellId);
  };

  const handleStartPress = () => {
    // Navigate to meditation page with data props
    router.push({
      pathname: "/meditation",
      params: {
        bellId: selectedBell,
        duration: "10", // This will come from your duration setting later
        interval: "3", // This will come from your interval setting later
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
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingVertical: 18, 
          borderBottomWidth: 1, 
          borderBottomColor: '#333'
        }}>
          <Text style={{ color: 'white', fontSize: 17, fontWeight: '500' }}>Duration</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#ff6b35', fontSize: 17, fontWeight: '600', marginRight: 8 }}>10 minutes</Text>
            <Text style={{ color: '#888', fontSize: 14 }}>▼</Text>
          </View>
        </View>
        
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingVertical: 18
        }}>
          <Text style={{ color: 'white', fontSize: 17, fontWeight: '500' }}>Interval bells</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#ff6b35', fontSize: 17, fontWeight: '600', marginRight: 8 }}>every 3 min</Text>
            <Text style={{ color: '#888', fontSize: 14 }}>▼</Text>
          </View>
        </View>
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
