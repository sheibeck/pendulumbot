export function difficulties() { return [
        {
            id: "A",
            "name": "The [Censored]",
            "details": 
            {
                round1: {
                    votes: -5,
                    score: -3
                },
                round2: {
                    votes: -4,
                    score: -1
                },
                round3: {
                    votes: -3,
                    score: 2
                },
                round4: {
                    votes: -2,
                    score: 6
                },
            }
        },
        {
            id: "B",
            "name": "The Underachiever",
            "details": 
            {
                round1: {
                    votes: -2,
                    score: -2
                },
                round2: {
                    votes: 0,
                    score: 0
                },
                round3: {
                    votes: 2,
                    score: 5
                },
                round4: {
                    votes: 3,
                    score: 10
                },
            }
        },
        {
            id: "C",
            "name": "The Average",
            "details": 
            {
                round1: {
                    votes: 0,
                    score: -1
                },
                round2: {
                    votes: 4,
                    score: 2
                },
                round3: {
                    votes: 8,
                    score: 9
                },
                round4: {
                    votes: 9,
                    score: 17
                },
            }
        }
        ,
        {
            id: "D",
            "name": "The Slightly Intimidating",
            "details": 
            {
                round1: {
                    votes: 1,
                    score: 0
                },
                round2: {
                    votes: 5,
                    score: 5
                },
                round3: {
                    votes: 9,
                    score: 10
                },
                round4: {
                    votes: 10,
                    score: 19
                },
            }
        }
        ,
        {
            id: "E",
            "name": "The Great",
            "details": 
            {
                round1: {
                    votes: 3,
                    score: 3
                },
                round2: {
                    votes: 7,
                    score: 6
                },
                round3: {
                    votes: 11,
                    score: 12
                },
                round4: {
                    votes: 13,
                    score: 24
                },
            }
        }
        ,
        {
            id: "F",
            "name": "The Unconquered",
            "details": 
            {
                round1: {
                    votes: 4,
                    score: 5
                },
                round2: {
                    votes: 7,
                    score: 9
                },
                round3: {
                    votes: 12,
                    score: 17
                },
                round4: {
                    votes: 13,
                    score: 32
                },
            }
        }
    ]
}

export function deck() { return [
        {
            id: 1,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 4,
                vp: 0,
                card: "GrandeWorker"
            }
        },
        {
            id: 2,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 3,
                vp: 0,
                card: "GrandeWorker"
            }
        },
        {
            id: 3,
            worker: {
                purple: true,
                green: false,
            },
            timer: {
                purple: true,
                green: true,
                black: false,
            },
            council: {
                votes: 1,
                vp: 1,
                card: "GrandeWorker"
            }
        },
        {
            id: 4,
            worker: {
                purple: false,
                green: true,
            },
            timer: {
                purple: true,
                green: false,
                black: true,
            },
            council: {
                votes: 2,
                vp: 0,
                card: "2-MilitaryCulture-TakeWorkerFromTimerRow"
            }
        },
        {
            id: 5,
            province: 1,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 2,
                vp: 0,
                card: "2-MilitaryCulture-TakeWorkerFromTimerRow"
            }
        },
        {
            id: 6,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: true,
                green: false,
                black: true,
            },
            council: {
                votes: 3,
                vp: 0,
                card: "2-MilitaryCulture-TakeWorkerFromTimerRow"
            }
        },
        {
            id: 7,
            worker: {
                purple: false,
                green: true,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: -1,
                vp: 2,
                card: "ExtraProvince"
            }
        },
        {
            id: 8,
            worker: {
                purple: true,
                green: false,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 2,
                vp: 1,
                card: "2-MilitaryCulture-TakeWorkerFromTimerRow"
            }
        },
        {
            id: 9,
            province: 2,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 3,
                vp: 1,
                card: "3-Military-2Votes-GainProvince"
            }
        },
        {
            id: 10,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 1,
                vp: 1,
                card: "GrandeWorker"
            }
        },
        {
            id: 11,
            worker: {
                purple: true,
                green: false,
            },
            timer: {
                purple: true,
                green: false,
                black: true,
            },
            council: {
                votes: 4,
                vp: 0,
                card: "GrandeWorker"
            }
        },
        {
            id: 12,
            worker: {
                purple: false,
                green: true,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 2,
                vp: 1,
                card: "GrandeWorker"
            }
        },
        {
            id: 13,
            province: 3,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 0,
                vp: 2,
                card: "ExtraProvince"
            }
        },
        {
            id: 14,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: true,
                green: true,
                black: false,
            },
            council: {
                votes: 1,
                vp: 1,
                card: "2-Money-YellowVictory"
            }
        },
        {
            id: 15,
            worker: {
                purple: false,
                green: true,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 1,
                vp: 1,
                card: "3-Military-2Votes-GainProvince"
            }
        },
        {
            id: 16,
            worker: {
                purple: true,
                green: false,
            },
            timer: {
                purple: true,
                green: false,
                black: true,
            },
            council: {
                votes: 2,
                vp: 0,
                card: "GrandeWorker"
            }
        },
        {
            id: 17,
            province: 4,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 2,
                vp: 1,
                card: "GrandeWorker"
            }
        },
        {
            id: 18,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 0,
                vp: 2,
                card: "GrandeWorker"
            }
        },
        {
            id: 19,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: true,
                green: true,
                black: false,
            },
            council: {
                votes: -1,
                vp: 2,
                card: "2-MilitaryCulture-TakeWorkerFromTimerRow"
            }
        },
        {
            id: 20,
            worker: {
                purple: false,
                green: true,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 0,
                vp: 2,
                card: "2-MilitaryCulture-TakeWorkerFromTimerRow"
            }
        },
        {
            id: 21,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 0,
                vp: 2,
                card: "2-MilitaryCulture-TakeWorkerFromTimerRow"
            }
        },
        {
            id: 22,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 2,
                vp: 1,
                card: "ExtraProvince"
            }
        },
        {
            id: 23,
            worker: {
                purple: true,
                green: false,
            },
            timer: {
                purple: false,
                green: false,
                black: false,
            },
            council: {
                votes: 1,
                vp: 2,
                card: "2-Money-YellowVictory"
            }
        },
        {
            id: 24,
            worker: {
                purple: false,
                green: true,
            },
            timer: {
                purple: true,
                green: false,
                black: true,
            },
            council: {
                votes: 1,
                vp: 2,
                card: "3-Military-2Votes-GainProvince"
            }
        },
        {
            id: 25,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: true,
                green: false,
                black: true,
            },
            council: {
                votes: 0,
                vp: 2,
                card: "GrandeWorker"
            }
        },
        {
            id: 26,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: true,
                green: true,
                black: false,
            },
            council: {
                votes: -1,
                vp: 2,
                card: "GrandeWorker"
            }
        },
        {
            id: 27,
            worker: {
                purple: true,
                green: false,
            },
            timer: {
                purple: true,
                green: false,
                black: true,
            },
            council: {
                votes: 1,
                vp: 1,
                card: "GrandeWorker"
            }
        },
        {
            id: 28,
            worker: {
                purple: false,
                green: true,
            },
            timer: {
                purple: true,
                green: true,
                black: false,
            },
            council: {
                votes: 0,
                vp: 1,
                card: "ExtraProvince"
            }
        },
        {
            id: 29,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: true,
                green: false,
                black: true,
            },
            council: {
                votes: 1,
                vp: 2,
                card: "2-Money-YellowVictory"
            }
        },
        {
            id: 30,
            worker: {
                purple: false,
                green: false,
            },
            timer: {
                purple: true,
                green: false,
                black: true,
            },
            council: {
                votes: 2,
                vp: 0,
                card: "3-Military-2Votes-GainProvince"
            }
        },
        {
            id: 31,
            worker: {
                purple: true,
                green: false,
            },
            timer: {
                purple: true,
                green: true,
                black: false,
            },
            council: {
                votes: 3,
                vp: 1,
                card: "2-Money-YellowVictory"
            }
        },
        {
            id: 32,
            worker: {
                purple: false,
                green: true,
            },
            timer: {
                purple: true,
                green: true,
                black: false,
            },
            council: {
                votes: 4,
                vp: 0,
                card: "3-Military-2Votes-GainProvince"
            }
        },
    ]
}
export default {difficulties, deck}