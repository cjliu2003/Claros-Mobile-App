const colorMap = {
    A: {
      BG: "#4BC15712",
      TXT: "#4BC157",
    },
    B: {
      BG: "#E1C52E12",
      TXT: "#E1C52E"
      
    },
    C: {
      BG: "#E0565612",
      TXT: "#E05656",
    }
}

export const handleGradeTextColor = (ev) => {
    let textColor = ev > 1 ? colorMap.A.TXT : (ev > -1 && ev < 1 ? colorMap.B.TXT : colorMap.C.TXT);
    return textColor
}

export const handleGradeBackgroundColor = (ev) => {
    let backgroundColor = ev >= 1 ? colorMap.A.BG : (ev > -1 && ev < 1 ? colorMap.B.BG : colorMap.C.BG);
    return backgroundColor
}