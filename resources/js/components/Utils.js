export const calculateThanhphanScore = (thanhphan) => {
    let { loaithanhphan, mathanhphan, pivot: {result1, result2} } = thanhphan;
    let score = 0;
    if(result1 == null && result2 == null) return null;
    if(loaithanhphan == 1) {
        let result = result1 || result2;
        if(result == 0) {
            score = 0;
        } else if(result == 1) {
            score = 100;
        }
    }
    if(loaithanhphan == 3) {
        let result = result1 || result2;
        switch(result) {
            case 0:
                score = 0;
                break;
            case 1: 
                score = 20;
                break;
            case 2:
                score = 40;
                break;
            case 3: 
                score = 60;
                break;
            case 4: 
                score = 80;
                break;
            case 5:
                score = 100;
                break;
        }
    }
    if(loaithanhphan == 2) {
        let result = 0;
        if(result1 !== null) {
            result += parseInt(result1);
        }
        if(result2 !== null) {
            result += parseInt(result2);
        }
        if(result == 0) {
            score = 0;
        } else if(result >= loaithanhphan2[mathanhphan].highestScore) {
            score = 100;
        } else {
            score = loaithanhphan2[mathanhphan][result.toString()];
        }
    }
    return score;
}

const loaithanhphan2 = {
    H1 : {
        highestScore: 2,
        '1': 50
    },
    H2 : {
        highestScore: 2,
        '1': 50
    },
    H3 : {
        highestScore: 2,
        '1': 50
    },
    H9 : {
        highestScore: 2,
        '1': 50
    },
    C6 : {
        highestScore: 1
    },
    D2 : {
        highestScore: 1
    },
    D3 : {
        highestScore: 1
    },
    D4 : {
        highestScore: 1
    },
    D5 : {
        highestScore: 1
    },
    D6 : {
        highestScore: 1
    }
}

export const currentDonvi1 = [0,1,5,6];
export const currentDonvi2 = [0,1,2,3,4,5,6];

// Chú thích lĩnh vực
// 1 : Khoa học Nông nghiệp
// 2 : Khoa học Tự nhiên
// 3 : Khoa học Xã hội và Nhân văn
// 4 : Khoa học Y dược
// 5 : Khoa học Kỹ thuật và Công nghệ
const trongsoTieuchi = {
    1 : {
        1: 0.2,
        2: 0.2,
        3: 0.2,
        4: 0.1333,
        5: 0.0667,
        6: 0.0667,
        7: 0.1333
    },
    2 : {
        1: 0.2307,
        2: 0.1538,
        3: 0.077,
        4: 0.1538,
        5: 0.077,
        6: 0.2307,
        7: 0.077
    },
    3 : {
        1: 0.1333,
        2: 0.0667,
        3: 0.2,
        4: 0.0667,
        5: 0.2,
        6: 0.2,
        7: 0.1333
    },
    4 : {
        1: 0.2143,
        2: 0.2143,
        3: 0.0715,
        4: 0.0715,
        5: 0.1428,
        6: 0.1428,
        7: 0.1428
    },
    5 : {
        1: 0.1875,
        2: 0.1875,
        3: 0.125,
        4: 0.125,
        5: 0.625,
        6: 0.125,
        7: 0.1875
    }
}

const trongsoThanhphan = {
    1 : {
        1: 0.1905,
        2: 0.0476,
        3: 0.0952,
        4: 0.0952,
        5: 0.1429,
        6: 0.1905,
        7: 0.1429,
        8: 0.0476,
        9: 0.0476,
        10: 0.25,
        11: 0.0833,
        12: 0.25,
        13: 0.1667,
        14: 0.1667,
        15: 0.0833,
        16: 0.1818,
        17: 0.0909,
        18: 0.1364,
        19: 0.0455,
        20: 0.0909,
        21: 0.1364,
        22: 0.0909,
        23: 0.1364,
        24: 0.0455,
        25: 0.0455,
        26: 0.1429,
        27: 0.1429,
        28: 0.0714,
        29: 0.2143,
        30: 0.2143,
        31: 0.1429,
        32: 0.0714,
        33: 0.1579,
        34: 0.1053,
        35: 0.1053,
        36: 0.1053,
        37: 0.2105,
        38: 0.1579,
        39: 0.0526,
        40: 0.1053,
        41: 0.2727,
        42: 0.0909,
        43: 0.2727,
        44: 0.0909,
        45: 0.0909,
        46: 0.1818,
        47: 0.25,
        48: 0.0833,
        49: 0.1667,
        50: 0.25,
        51: 0.1667,
        52: 0.0833
    },
    2 : {
        1: 0.1905,
        2: 0.1429,
        3: 0.0952,
        4: 0.0952,
        5: 0.1429,
        6: 0.1429,
        7: 0.0952,
        8: 0.0476,
        9: 0.0476,
        10: 0.1667,
        11: 0.25,
        12: 0.25,
        13: 0.1667,
        14: 0.0833,
        15: 0.0833,
        16: 0.0833,
        17: 0.0417,
        18: 0.0417,
        19: 0.0833,
        20: 0.125,
        21: 0.1667,
        22: 0.125,
        23: 0.1667,
        24: 0.125,
        25: 0.0417,
        26: 0.15,
        27: 0.15,
        28: 0.2,
        29: 0.1,
        30: 0.05,
        31: 0.15,
        32: 0.2,
        33: 0.0667,
        34: 0.2,
        35: 0.2,
        36: 0.1333,
        37: 0.1333,
        38: 0.1333,
        39: 0.0667,
        40: 0.0667,
        41: 0.1538,
        42: 0.1538,
        43: 0.1538,
        44: 0.2308,
        45: 0.2308,
        46: 0.0769,
        47: 0.25,
        48: 0.1667,
        49: 0.1667,
        50: 0.1667,
        51: 0.1667,
        52: 0.0833
    },
    3 : {
        1: 0.1667,
        2: 0.1667,
        3: 0.0417,
        4: 0.0417,
        5: 0.125,
        6: 0.1667,
        7: 0.0833,
        8: 0.0833,
        9: 0.125,
        10: 0.1667,
        11: 0.0833,
        12: 0.0833,
        13: 0.0833,
        14: 0.3333,
        15: 0.25,
        16: 0.08,
        17: 0.12,
        18: 0.08,
        19: 0.08,
        20: 0.12,
        21: 0.08,
        22: 0.16,
        23: 0.16,
        24: 0.04,
        25: 0.08,
        26: 0.0556,
        27: 0.0556,
        28: 0.2222,
        29: 0.1667,
        30: 0.1667,
        31: 0.1111,
        32: 0.2222,
        33: 0.0625,
        34: 0.1875,
        35: 0.125,
        36: 0.1875,
        37: 0.0625,
        38: 0.1875,
        39: 0.125,
        40: 0.0625,
        41: 0.1667,
        42: 0.25,
        43: 0.1667,
        44: 0.0833,
        45: 0.0833,
        46: 0.25,
        47: 0.25,
        48: 0.0833,
        49: 0.0833,
        50: 0.1667,
        51: 0.1667,
        52: 0.25
    },
    4: {
        1: 0.1739,
        2: 0.1739,
        3: 0.1304,
        4: 0.1304,
        5: 0.1304,
        6: 0.087,
        7: 0.087,
        8: 0.0435,
        9: 0.0435,
        10: 0.25,
        11: 0.0833,
        12: 0.1667,
        13: 0.0833,
        14: 0.25,
        15: 0.1667,
        16: 0.0833,
        17: 0.0833,
        18: 0.0833,
        19: 0.0833,
        20: 0.125,
        21: 0.1667,
        22: 0.1667,
        23: 0.125,
        24: 0.0417,
        25: 0.0417,
        26: 0.2143,
        27: 0.0714,
        28: 0.1429,
        29: 0.1429,
        30: 0.714,
        31: 0.2143,
        32: 0.1429,
        33: 0.1429,
        34: 0.0714,
        35: 0.1429,
        36: 0.0714,
        37: 0.2143,
        38: 0.2143,
        39: 0.0714,
        40: 0.0714,
        41: 0.2308,
        42: 0.2308,
        43: 0.1538,
        44: 0.0769,
        45: 0.2308,
        46: 0.0769,
        47: 0.25,
        48: 0.0833,
        49: 0.25,
        50: 0.1667,
        51: 0.0833,
        52: 0.1667
    },
    5: {
        1: 0.1739,
        2: 0.1304,
        3: 0.1304,
        4: 0.1304,
        5: 0.1739,
        6: 0.087,
        7: 0.087,
        8: 0.0435,
        9: 0.0435,
        10: 0.1667,
        11: 0.25,
        12: 0.0833,
        13: 0.0833,
        14: 0.1667,
        15: 0.25,
        16: 0.16,
        17: 0.08,
        18: 0.08,
        19: 0.08,
        20: 0.12,
        21: 0.16,
        22: 0.12,
        23: 0.12,
        24: 0.04,
        25: 0.04,
        26: 0.2143,
        27: 0.2143,
        28: 0.1429,
        29: 0.0714,
        30: 0.0714,
        31: 0.1429,
        32: 0.1429,
        33: 0.1538,
        34: 0.0769,
        35: 0.1538,
        36: 0.0769,
        37: 0.2308,
        38: 0.1538,
        39: 0.0769,
        40: 0.0769,
        41: 0.25,
        42: 0.833,
        43: 0.25,
        44: 0.1667,
        45: 0.1667,
        46: 0.0833,
        47: 0.3,
        48: 0.1,
        49: 0.1,
        50: 0.1,
        51: 0.2,
        52: 0.2
    }
}

export const calculateTieuchiScore = (linhvuc, thanhphans) => {
    // console.log('thanhphans', thanhphans);
    if(!linhvuc || !thanhphans) return null;
    let score = 0;
    thanhphans.forEach(tp => {
        let { id, diemthanhphan1 } = tp;
        score += (trongsoThanhphan[linhvuc][id] * diemthanhphan1);
    })
    return score;
}

export const calculateDetaiScore = (linhvuc, tieuchis) => {
    if(!linhvuc || !tieuchis) return null;
    let score = 0;
    tieuchis.forEach(tc => {
        let {id, diemtieuchi } = tc;
        score += (trongsoTieuchi[linhvuc][id] * diemtieuchi);
    })
    return score;
}

export function flattenThanhphans(tieuchis) {
    let newThanhphans = [];
    tieuchis.forEach(tc => {
        let { thanhphans } = tc;
        newThanhphans = [...newThanhphans, ...thanhphans];
    })
    return newThanhphans;
}

export function checkIfDone(thanhphans) {
    return thanhphans.every(tp => {
        let { cauhoi1, cauhoi2, pivot:{ result1, result2 }} = tp;
        let isOk = true;
        if(cauhoi1 != null && (result1 == null || result1 === "")){
            isOk = false;
        }
        if(cauhoi2 != null && (result2 == null || result2 === "")){
            isOk = false;
        }
        return isOk;
    })
}

export function getLinhVucName(id) {
    switch(id) {
        case 1:
            return 'Khoa học nông nghiệp';
        case 2:
            return 'Khoa học tự nhiên';
        case 3:
            return 'Khoa học xã hội và nhân văn';
        case 4:
            return 'Khoa học Y dược';
        case 5:
            return 'Kỹ thuật và Công nghệ';
    }   
}

export function getGrade(score) {
    if(score >= 0 && score <= 20) {
        return 'E';
    }
    if(score > 20 && score <= 40) {
        return 'D';
    }
    if(score > 40 && score <= 60) {
        return 'C';
    }
    if(score > 60 && score <= 80) {
        return 'B';
    }
    if(score > 80 && score <= 100) {
        return 'A';
    }    
}

export function getFinalComment(score) {
   let grade = getGrade(score);
   switch(grade) {
       case 'A':
           return 'Có hiệu quả kinh tế - xã hội rất đáng kể';
       case 'B':
           return 'Có hiệu quả kinh tế - xã hội đáng kể';
       case 'C':
           return 'Có hiệu quả kinh tế - xã hội vừa phải';
       case 'D': 
           return 'Có hiệu quả kinh tế - xã hội thấp';
       case 'E':
           return 'Không có hiệu quả kinh tế - xã hội'; 
   }
}

export function precise(x) {
    let result = Number.parseFloat(x).toFixed(2);
    return result.split('.')[1] === "00" ? result.split('.')[0] : result; 
  }
