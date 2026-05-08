export type IlloStyle = 'stick' | 'line' | 'twotone';

export interface Movement {
  id: string;
  name: string;
  cues: string[];
}

export interface MovementGroup {
  label: string;
  main: Movement[];
  warmup: Movement;
}

export const MOVEMENTS: Record<string, MovementGroup> = {
  shoulder: {
    label: 'Shoulder',
    main: [
      {
        id: 'pike',
        name: 'Pike Push-Up',
        cues: [
          'Hands shoulder-width apart',
          'Hips high, head between arms',
          'Lower the crown of your head toward the floor',
        ],
      },
      {
        id: 'taps',
        name: 'Shoulder Taps',
        cues: [
          'Start in a high plank',
          'Tap opposite shoulder with each hand',
          'Keep hips still — no rocking',
        ],
      },
    ],
    warmup: {
      id: 'circles',
      name: 'Arm Circles',
      cues: [
        'Arms out to the sides',
        'Small circles forward × 10',
        'Then small circles back × 10',
      ],
    },
  },
  chest: {
    label: 'Chest',
    main: [
      {
        id: 'push',
        name: 'Push-Up',
        cues: [
          'Hands a bit wider than shoulders',
          'Lower until chest nearly touches floor',
          'Keep body in one straight line',
        ],
      },
      {
        id: 'incline',
        name: 'Incline Push-Up',
        cues: [
          'Hands on a sturdy surface',
          'Body straight, head neutral',
          'Lower chest to the surface',
        ],
      },
    ],
    warmup: {
      id: 'knee',
      name: 'Knee Push-Up',
      cues: [
        'Knees down, body straight from knees to head',
        'Slow controlled reps',
        'Warm up the chest gently',
      ],
    },
  },
  back: {
    label: 'Back',
    main: [
      {
        id: 'super',
        name: 'Superman',
        cues: [
          'Lie face down, arms in front',
          'Lift arms, chest, and legs',
          'Hold for 1 second, lower with control',
        ],
      },
      {
        id: 'angel',
        name: 'Reverse Snow Angel',
        cues: [
          'Face down, arms by sides',
          'Sweep arms out and overhead',
          'Squeeze shoulder blades together',
        ],
      },
    ],
    warmup: {
      id: 'gm',
      name: 'Good Mornings',
      cues: [
        'Stand tall, hands at sides',
        'Hinge at the hips, back flat',
        'Return to standing, slow tempo',
      ],
    },
  },
  legs: {
    label: 'Legs',
    main: [
      {
        id: 'squat',
        name: 'Bodyweight Squat',
        cues: [
          'Feet shoulder-width',
          'Sit back as if into a chair',
          'Knees track over toes',
        ],
      },
      {
        id: 'lunge',
        name: 'Reverse Lunge',
        cues: [
          'Step one foot back',
          'Lower until both knees are ~90°',
          'Push through the front heel to stand',
        ],
      },
    ],
    warmup: {
      id: 'bridge',
      name: 'Glute Bridge',
      cues: [
        'Lie on back, knees bent',
        'Lift hips until body is straight',
        'Squeeze glutes at the top',
      ],
    },
  },
  core: {
    label: 'Core',
    main: [
      {
        id: 'plank',
        name: 'Plank Hold',
        cues: [
          'Forearms or hands flat',
          'Body straight, no sag in the hips',
          'Breathe — count reps as 5-second holds',
        ],
      },
      {
        id: 'situp',
        name: 'Sit-Up',
        cues: [
          'Knees bent, feet flat',
          'Roll up one vertebra at a time',
          "Lower with control — don't flop",
        ],
      },
    ],
    warmup: {
      id: 'deadbug',
      name: 'Dead Bug',
      cues: [
        'On your back, knees over hips',
        'Extend opposite arm and leg',
        'Keep low back pressed to the floor',
      ],
    },
  },
  arms: {
    label: 'Arms',
    main: [
      {
        id: 'dip',
        name: 'Tricep Dip',
        cues: [
          'Hands on a chair behind you',
          'Lower until elbows reach ~90°',
          'Press up through the heels of your hands',
        ],
      },
      {
        id: 'diamond',
        name: 'Diamond Push-Up',
        cues: [
          'Hands together under chest, thumbs and index touching',
          'Elbows close to body',
          'Lower slowly, drive up',
        ],
      },
    ],
    warmup: {
      id: 'inch',
      name: 'Inchworm',
      cues: [
        'Stand, fold to touch the floor',
        'Walk hands out to a plank',
        'Walk back in, stand tall',
      ],
    },
  },
};

export const MOVEMENT_KEYS = ['shoulder', 'chest', 'back', 'legs', 'core', 'arms'];
