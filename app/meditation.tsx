import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer } from "expo-audio";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

export default function Meditation() {
  const { duration, bellId, interval } = useLocalSearchParams();
  const [phase, setPhase] = useState<'prep' | 'meditation' | 'complete'>('prep');
  const [prepTime, setPrepTime] = useState(10);
  const [timeLeft, setTimeLeft] = useState(parseInt(duration as string) * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [lastIntervalTime, setLastIntervalTime] = useState(0);
  
  // Create audio players
  const bell1Player = useAudioPlayer(require('../assets/sounds/bells/bell1.mp3'));
  const bell2Player = useAudioPlayer(require('../assets/sounds/bells/bell2.mp3'));
  const bell3Player = useAudioPlayer(require('../assets/sounds/bells/bell3.mp3'));
  const intervalPlayer = useAudioPlayer(require('../assets/sounds/interval/longbell.mp3'));
  
  const progress = useSharedValue(0);
  const totalTime = parseInt(duration as string) * 60;
  const intervalMinutes = parseInt(interval as string);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  
  useEffect(() => {
    if (phase === 'prep' && prepTime > 0) {
      const timer = setTimeout(() => setPrepTime(prepTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'prep' && prepTime === 0) {
      startMeditation();
    }
  }, [phase, prepTime]);

  useEffect(() => {
    if (phase === 'meditation' && !isPaused && timeLeft > 0) {
      const timer = setTimeout(() => {
        const newTimeLeft = timeLeft - 1;
        setTimeLeft(newTimeLeft);
        progress.value = withTiming((totalTime - newTimeLeft) / totalTime, { duration: 1000 });
        checkIntervalBell(newTimeLeft);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'meditation' && timeLeft === 0) {
      endMeditation();
    }
  }, [phase, timeLeft, isPaused, totalTime]);

  const checkIntervalBell = (currentTimeLeft: number) => {
    if (intervalMinutes > 0) {
      const elapsedTime = totalTime - currentTimeLeft;
      const minutesElapsed = Math.floor(elapsedTime / 60);
      
      if (minutesElapsed > 0 && minutesElapsed % intervalMinutes === 0 && minutesElapsed !== lastIntervalTime) {
        playIntervalBell();
        setLastIntervalTime(minutesElapsed);
      }
    }
  };

  const playIntervalBell = () => {
    intervalPlayer.seekTo(0);
    intervalPlayer.play();
  };

  const playBell = () => {
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

  const startMeditation = () => {
    playBell();
    setPhase('meditation');
  };

  const endMeditation = () => {
    playBell();
    setPhase('complete');
  };

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 2 * Math.PI * 140 * (1 - progress.value),
  }));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ position: 'absolute', top: 60, left: 20, zIndex: 10 }}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </Pressable>
      </View>

      <View style={{ position: 'relative', marginBottom: 80 }}>
        <Svg width={300} height={300}>
          <Circle cx={150} cy={150} r={140} stroke="#333" strokeWidth={12} fill="none" />
          {phase === 'meditation' && (
            <AnimatedCircle
              cx={150}
              cy={150}
              r={140}
              stroke="#ff6b35"
              strokeWidth={12}
              fill="none"
              strokeDasharray={2 * Math.PI * 140}
              strokeDashoffset={2 * Math.PI * 140}
              strokeLinecap="round"
              transform="rotate(-90 150 150)"
              animatedProps={animatedProps}
            />
          )}
        </Svg>
        
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
          {phase === 'prep' ? (
            <>
              <Text style={{ color: '#888', fontSize: 18, marginBottom: 20, textAlign: 'center' }}>
                The practice session starts in
              </Text>
              <Text style={{ color: 'white', fontSize: 48, fontWeight: 'bold', fontFamily: 'monospace' }}>
                {prepTime}
              </Text>
            </>
          ) : phase === 'meditation' ? (
            <Text style={{ color: 'white', fontSize: 48, fontWeight: 'bold', fontFamily: 'monospace' }}>
              {formatTime(timeLeft)}
            </Text>
          ) : (
            <>
              <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
                Your {Math.floor(totalTime / 60)} minute meditation has ended
              </Text>
              <Text style={{ color: '#888', fontSize: 18, textAlign: 'center' }}>
                Thank you for your practice
              </Text>
            </>
          )}
        </View>
      </View>

      {phase === 'meditation' && (
        <Pressable onPress={() => setIsPaused(!isPaused)} style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }}>
          {isPaused ? (
            <View style={{ width: 0, height: 0, borderLeftWidth: 20, borderTopWidth: 12, borderBottomWidth: 12, borderLeftColor: 'white', borderTopColor: 'transparent', borderBottomColor: 'transparent' }} />
          ) : (
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={{ width: 6, height: 24, backgroundColor: 'white' }} />
              <View style={{ width: 6, height: 24, backgroundColor: 'white' }} />
            </View>
          )}
        </Pressable>
      )}
    </View>
  );
}
