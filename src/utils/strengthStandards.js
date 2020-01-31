export const ageBonus = age =>
  0.0042 * Math.pow(age, 3) - 0.0764 * Math.pow(age, 2) + 0.1384 * age - 0.3793;
export const strengthStandards = {
  exercises: [
    {
      name: "Barbell Bench Press",
      standardThresholds: {
        beginner: {
          male: (age, bw) =>
            (0.00004396 * Math.pow(bw, 3) -
              0.0024 * Math.pow(bw, 2) +
              0.0447 * bw +
              0.4453) *
            ageBonus(age),
          female: (age, bw) =>
            (0.0000291 * Math.pow(bw, 3) -
              0.0019 * Math.pow(bw, 2) +
              0.0627 * bw +
              1.8007) *
            ageBonus(age)
        },
        novice: {
          male: (age, bw) =>
            (0.00004941 * Math.pow(bw, 3) -
              0.0025 * Math.pow(bw, 2) +
              0.0399 * bw +
              0.7374) *
            ageBonus(age),
          female: (age, bw) =>
            (0.0000257 * Math.pow(bw, 3) -
              0.0011 * Math.pow(bw, 2) +
              0.0133 * bw +
              0.4451) *
            ageBonus(age)
        },
        intermediate: {
          male: (age, bw) =>
            (0.00005592 * Math.pow(bw, 3) -
              0.0026 * Math.pow(bw, 2) +
              0.0331 * bw +
              1.1053) *
            ageBonus(age),
          female: (age, bw) =>
            (0.00002892 * Math.pow(bw, 3) -
              0.001 * Math.pow(bw, 2) +
              0.0009 * bw +
              0.7919) *
            ageBonus(age)
        },
        advanced: {
          male: (age, bw) =>
            (0.00004694 * Math.pow(bw, 3) -
              0.002 * Math.pow(bw, 2) +
              0.0155 * bw +
              1.5644) *
            ageBonus(age),
          female: (age, bw) =>
            (0.000002306 * Math.pow(bw, 3) -
              0.0003 * Math.pow(bw, 2) +
              0.0277 * bw +
              1.2623) *
            ageBonus(age)
        },
        elite: {
          male: (age, bw) =>
            (0.00002745 * Math.pow(bw, 3) -
              0.0011 * Math.pow(bw, 2) +
              0.0084 * bw +
              2.0745) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.0000291 * Math.pow(bw, 3) +
              0.0019 * Math.pow(bw, 2) -
              0.0627 * bw +
              1.8067) *
            ageBonus(age)
        }
      }
    },
    {
      name: "Barbell Back Squat",
      standardThresholds: {
        beginner: {
          male: (age, bw) =>
            (0.00006294 * Math.pow(bw, 3) -
              0.0033 * Math.pow(bw, 2) +
              0.0576 * bw +
              0.6166) *
            ageBonus(age),
          female: (age, bw) =>
            (0.0000447 * Math.pow(bw, 3) -
              0.0018 * Math.pow(bw, 2) +
              0.0209 * bw +
              0.4156) *
            ageBonus(age)
        },
        novice: {
          male: (age, bw) =>
            (0.00006839 * Math.pow(bw, 3) -
              0.0034 * Math.pow(bw, 2) +
              0.0514 * bw +
              0.9977) *
            ageBonus(age),
          female: (age, bw) =>
            (0.00002774 * Math.pow(bw, 3) -
              0.001 * Math.pow(bw, 2) +
              0.0015 * bw +
              0.7906) *
            ageBonus(age)
        },
        intermediate: {
          male: (age, bw) =>
            (0.00006541 * Math.pow(bw, 3) -
              0.0031 * Math.pow(bw, 2) +
              0.0373 * bw +
              1.4885) *
            ageBonus(age),
          female: (age, bw) =>
            (0.0000001284 * Math.pow(bw, 3) -
              0.0004 * Math.pow(bw, 2) +
              0.0284 * bw +
              1.2945) *
            ageBonus(age)
        },
        advanced: {
          male: (age, bw) =>
            (0.00005678 * Math.pow(bw, 3) -
              0.0024 * Math.pow(bw, 2) +
              0.0155 * bw +
              2.0767) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.00002306 * Math.pow(bw, 3) +
              0.0023 * Math.pow(bw, 2) -
              0.0693 * bw +
              1.1997) *
            ageBonus(age)
        },
        elite: {
          male: (age, bw) =>
            (0.00004456 * Math.pow(bw, 3) -
              0.0016 * Math.pow(bw, 2) +
              0.0122 * bw +
              2.7301) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.00008025 * Math.pow(bw, 3) +
              0.0044 * Math.pow(bw, 2) -
              0.1157 * bw +
              2.6218) *
            ageBonus(age)
        }
      }
    },
    {
      name: "Barbell Deadlift",
      standardThresholds: {
        beginner: {
          male: (age, bw) =>
            (-0.00006222 * Math.pow(bw, 3) -
              0.0032 * Math.pow(bw, 2) +
              0.0528 * bw +
              0.8312) *
            ageBonus(age),
          female: (age, bw) =>
            (0.0003266 * Math.pow(bw, 3) -
              0.0013 * Math.pow(bw, 2) +
              0.0099 * bw +
              0.5928) *
            ageBonus(age)
        },
        novice: {
          male: (age, bw) =>
            (0.00006304 * Math.pow(bw, 3) -
              0.0031 * Math.pow(bw, 2) +
              0.0416 * bw +
              1.2787) *
            ageBonus(age),
          female: (age, bw) =>
            (0.00002548 * Math.pow(bw, 3) -
              0.0007 * Math.pow(bw, 2) +
              0.0095 * bw +
              1.0122) *
            ageBonus(age)
        },
        intermediate: {
          male: (age, bw) =>
            (-0.00001668 * Math.pow(bw, 3) +
              0.0012 * Math.pow(bw, 2) -
              0.0475 * bw +
              1.5894) *
            ageBonus(age),
          female: (age, bw) =>
            (0.0000001284 * Math.pow(bw, 3) -
              0.0004 * Math.pow(bw, 2) +
              0.0284 * bw +
              1.2945) *
            ageBonus(age)
        },
        advanced: {
          male: (age, bw) =>
            (0.00004235 * Math.pow(bw, 3) -
              0.0016 * Math.pow(bw, 2) +
              0.0057 * bw +
              2.5155) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.0000646 * Math.pow(bw, 3) +
              0.0036 * Math.pow(bw, 2) -
              0.0957 * bw +
              2.2902) *
            ageBonus(age)
        },
        elite: {
          male: (age, bw) =>
            (0.00002228 * Math.pow(bw, 3) -
              0.0004 * Math.pow(bw, 2) +
              0.0406 * bw +
              3.2548) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.0001 * Math.pow(bw, 3) +
              0.0063 * Math.pow(bw, 2) -
              0.1513 * bw +
              3.0712) *
            ageBonus(age)
        }
      }
    },
    {
      name: "Barbell Shoulder Press",
      standardThresholds: {
        beginner: {
          male: (age, bw) =>
            (0.00003346 * Math.pow(bw, 3) -
              0.0017 * Math.pow(bw, 2) +
              0.0299 * bw +
              0.2682) *
            ageBonus(age),
          female: (age, bw) =>
            (0.0001498 * Math.pow(bw, 3) -
              0.0007 * Math.pow(bw, 2) +
              0.0094 * bw +
              0.1706) *
            ageBonus(age)
        },
        novice: {
          male: (age, bw) =>
            (0.0000333 * Math.pow(bw, 3) -
              0.0017 * Math.pow(bw, 2) +
              0.0261 * bw +
              0.4704) *
            ageBonus(age),
          female: (age, bw) =>
            (0.00001739 * Math.pow(bw, 3) -
              0.0006 * Math.pow(bw, 2) +
              0.0029 * bw +
              0.334) *
            ageBonus(age)
        },
        intermediate: {
          male: (age, bw) =>
            (0.00003161 * Math.pow(bw, 3) -
              0.0015 * Math.pow(bw, 2) +
              0.0183 * bw +
              0.7391) *
            ageBonus(age),
          female: (age, bw) =>
            (0.0000001113 * Math.pow(bw, 3) -
              0.0001 * Math.pow(bw, 2) +
              0.0117 * bw +
              0.5871) *
            ageBonus(age)
        },
        advanced: {
          male: (age, bw) =>
            (0.00002582 * Math.pow(bw, 3) -
              0.0011 * Math.pow(bw, 2) +
              0.0058 * bw +
              1.0649) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.00001605 * Math.pow(bw, 3) +
              0.001 * Math.pow(bw, 2) -
              0.0309 * bw +
              0.8929) *
            ageBonus(age)
        },
        elite: {
          male: (age, bw) =>
            (0.00001709 * Math.pow(bw, 3) -
              0.0006 * Math.pow(bw, 2) +
              0.0105 * bw +
              1.4323) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.00003848 * Math.pow(bw, 3) +
              0.0021 * Math.pow(bw, 2) -
              0.0551 * bw +
              1.2425) *
            ageBonus(age)
        }
      }
    },
    {
      name: "Barbell Curl",
      standardThresholds: {
        beginner: {
          male: (age, bw) =>
            (0.00001364 * Math.pow(bw, 3) -
              0.0008 * Math.pow(bw, 2) +
              0.015 * bw +
              0.1671) *
            ageBonus(age),
          female: (age, bw) =>
            (0.00001439 * Math.pow(bw, 3) -
              0.0006 * Math.pow(bw, 2) +
              0.0088 * bw +
              0.0715) *
            ageBonus(age)
        },
        novice: {
          male: (age, bw) =>
            (0.00001977 * Math.pow(bw, 3) -
              0.0009 * Math.pow(bw, 2) +
              0.0132 * bw +
              0.344) *
            ageBonus(age),
          female: (age, bw) =>
            (0.00001552 * Math.pow(bw, 3) -
              0.0006 * Math.pow(bw, 2) +
              0.0058 * bw +
              0.2044) *
            ageBonus(age)
        },
        intermediate: {
          male: (age, bw) =>
            (0.00001291 * Math.pow(bw, 3) -
              0.0006 * Math.pow(bw, 2) +
              0.0028 * bw +
              0.6055) *
            ageBonus(age),
          female: (age, bw) =>
            (0.000001311 * Math.pow(bw, 3) -
              0.0003 * Math.pow(bw, 2) +
              0.004 * bw +
              0.4172) *
            ageBonus(age)
        },
        advanced: {
          male: (age, bw) =>
            (0.00000369 * Math.pow(bw, 3) -
              0.00000772 * Math.pow(bw, 2) +
              0.0129 * bw +
              0.94) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.00001183 * Math.pow(bw, 3) +
              0.0007 * Math.pow(bw, 2) -
              0.0242 * bw +
              0.7129) *
            ageBonus(age)
        },
        elite: {
          male: (age, bw) =>
            (-0.000006438 * Math.pow(bw, 3) +
              0.0007 * Math.pow(bw, 2) -
              0.0317 * bw +
              1.3211) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.00003895 * Math.pow(bw, 3) +
              0.002 * Math.pow(bw, 2) -
              0.0503 * bw +
              1.0709) *
            ageBonus(age)
        }
      }
    },
    {
      name: "Barbell Bent Over Row",
      standardThresholds: {
        beginner: {
          male: (age, bw) =>
            (0.00003479 * Math.pow(bw, 3) -
              0.0019 * Math.pow(bw, 2) +
              0.0352 * bw +
              0.3865) *
            ageBonus(age),
          female: (age, bw) =>
            (0.000003958 * Math.pow(bw, 3) -
              0.0001 * Math.pow(bw, 2) -
              0.0016 * bw +
              0.2568) *
            ageBonus(age)
        },
        novice: {
          male: (age, bw) =>
            (0.00004314 * Math.pow(bw, 3) -
              0.0021 * Math.pow(bw, 2) +
              0.0321 * bw +
              0.6493) *
            ageBonus(age),
          female: (age, bw) =>
            (0.000004613 * Math.pow(bw, 3) +
              0.00006134 * Math.pow(bw, 2) -
              0.0113 * bw +
              0.479) *
            ageBonus(age)
        },
        intermediate: {
          male: (age, bw) =>
            (0.00003946 * Math.pow(bw, 3) -
              0.0018 * Math.pow(bw, 2) +
              0.0209 * bw +
              1.0019) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.000003122 * Math.pow(bw, 3) +
              0.0015 * Math.pow(bw, 2) -
              0.0367 * bw +
              0.8094) *
            ageBonus(age)
        },
        advanced: {
          male: (age, bw) =>
            (0.0000322 * Math.pow(bw, 3) -
              0.0014 * Math.pow(bw, 2) +
              0.0052 * bw +
              1.4209) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.00005763 * Math.pow(bw, 3) +
              0.0029 * Math.pow(bw, 2) -
              0.0652 * bw +
              1.2126) *
            ageBonus(age)
        },
        elite: {
          male: (age, bw) =>
            (0.0000241 * Math.pow(bw, 3) -
              0.0008 * Math.pow(bw, 2) -
              0.0146 * bw +
              1.8923) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.00009323 * Math.pow(bw, 3) +
              0.0046 * Math.pow(bw, 2) -
              0.1008 * bw +
              1.6781) *
            ageBonus(age)
        }
      }
    },
    {
      name: "Barbell Power Clean",
      standardThresholds: {
        beginner: {
          male: (age, bw) =>
            (0.00003375 * Math.pow(bw, 3) -
              0.0016 * Math.pow(bw, 2) +
              0.0234 * bw +
              0.5353) *
            ageBonus(age),
          female: (age, bw) =>
            (0.000001041 * Math.pow(bw, 3) -
              0.0003 * Math.pow(bw, 2) -
              0.0038 * bw +
              0.4697) *
            ageBonus(age)
        },
        novice: {
          male: (age, bw) =>
            (0.00003021 * Math.pow(bw, 3) -
              0.0014 * Math.pow(bw, 2) +
              0.0133 * bw +
              0.8287) *
            ageBonus(age),
          female: (age, bw) =>
            (0.00000335 * Math.pow(bw, 3) +
              0.0002 * Math.pow(bw, 2) -
              0.0186 * bw +
              0.7176) *
            ageBonus(age)
        },
        intermediate: {
          male: (age, bw) =>
            (0.0000204 * Math.pow(bw, 3) -
              0.0008 * Math.pow(bw, 2) -
              0.0033 * bw +
              1.2072) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.00002895 * Math.pow(bw, 3) +
              0.0016 * Math.pow(bw, 2) -
              0.0428 * bw +
              1.0404) *
            ageBonus(age)
        },
        advanced: {
          male: (age, bw) =>
            (0.000009955 * Math.pow(bw, 3) -
              0.0001 * Math.pow(bw, 2) -
              0.0228 * bw +
              1.6445) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.0000562 * Math.pow(bw, 3) +
              0.0029 * Math.pow(bw, 2) -
              0.069 * bw +
              1.4089) *
            ageBonus(age)
        },
        elite: {
          male: (age, bw) =>
            (-0.000008242 * Math.pow(bw, 3) +
              0.0009 * Math.pow(bw, 2) -
              0.0485 * bw +
              2.1313) *
            ageBonus(age),
          female: (age, bw) =>
            (-0.00008364 * Math.pow(bw, 3) +
              0.0043 * Math.pow(bw, 2) -
              0.0979 * bw +
              1.8123) *
            ageBonus(age)
        }
      }
    }
  ]
};
