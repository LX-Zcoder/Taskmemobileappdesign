// Notification tones management

export interface NotificationTone {
  id: string;
  name: string;
  nameAr: string;
  isCustom?: boolean;
  file?: File;
}

export const DEFAULT_TONES: NotificationTone[] = [
  { id: "classic", name: "Classic", nameAr: "كلاسيك" },
  { id: "gentle", name: "Gentle", nameAr: "هادئ" },
  { id: "upbeat", name: "Upbeat", nameAr: "نشيط" },
  { id: "calm", name: "Calm", nameAr: "مريح" },
  { id: "bright", name: "Bright", nameAr: "مشرق" },
  { id: "soft", name: "Soft", nameAr: "ناعم" },
];

// Play notification sound with longer melodies
export const playNotificationSound = (toneId: string, customFile?: string, startTime?: number, endTime?: number): void => {
  try {
    if (customFile) {
      // Play custom file with optional start/end time
      const audio = new Audio(customFile);
      audio.volume = 0.5;
      
      if (startTime !== undefined && endTime !== undefined) {
        audio.currentTime = startTime;
        audio.play().catch((err) => console.error("Error playing custom sound:", err));
        
        // Stop at end time
        const checkTime = setInterval(() => {
          if (audio.currentTime >= endTime) {
            audio.pause();
            clearInterval(checkTime);
          }
        }, 100);
      } else {
        audio.play().catch((err) => console.error("Error playing custom sound:", err));
      }
    } else {
      // Use Web Audio API to generate melodic tones
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Play melody based on tone type
      playMelody(audioContext, toneId);
    }
  } catch (error) {
    console.error("Error playing notification sound:", error);
  }
};

// Play musical melodies
const playMelody = (audioContext: AudioContext, toneId: string): void => {
  const melodies: { [key: string]: { notes: number[], durations: number[] } } = {
    classic: {
      notes: [523.25, 659.25, 783.99, 1046.50], // C5, E5, G5, C6
      durations: [0.15, 0.15, 0.15, 0.3]
    },
    gentle: {
      notes: [440, 523.25, 659.25], // A4, C5, E5
      durations: [0.25, 0.25, 0.4]
    },
    upbeat: {
      notes: [659.25, 783.99, 987.77, 1174.66], // E5, G5, B5, D6
      durations: [0.12, 0.12, 0.12, 0.25]
    },
    calm: {
      notes: [349.23, 440, 523.25], // F4, A4, C5
      durations: [0.3, 0.3, 0.5]
    },
    bright: {
      notes: [783.99, 987.77, 1174.66, 1318.51], // G5, B5, D6, E6
      durations: [0.15, 0.15, 0.15, 0.35]
    },
    soft: {
      notes: [392, 493.88, 587.33], // G4, B4, D5
      durations: [0.25, 0.25, 0.45]
    }
  };

  const melody = melodies[toneId] || melodies.classic;
  let currentTime = audioContext.currentTime;

  melody.notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    
    const duration = melody.durations[index];
    
    // Envelope for smooth sound
    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);
    
    oscillator.start(currentTime);
    oscillator.stop(currentTime + duration);
    
    currentTime += duration;
  });
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

// Show browser notification
export const showNotification = (title: string, body: string): void => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/icon.png",
      badge: "/badge.png",
    });
  }
};

// Handle custom file upload
export const handleCustomToneUpload = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("audio/")) {
      reject(new Error("Please select an audio file"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};