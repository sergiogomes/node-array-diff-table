const prevArray = [
  {
    id: "23b9dbff",
    name: "Jessie",
    age: 50,
    children: [
      {
        id: "5c0f3094",
        name: "Peter",
        age: 20
      },
      {
        id: "c1484221",
        name: "Paul",
        age: 32,
        children: [
          {
            id: "2e6d866e",
            name: "Carol",
          },
          {
            id: "e48a27ad",
            name: "Hester",
            age: 15
          }
        ]
      },
      {
        id: "8a265c23",
        name: "Hilda",
      }
    ]
  },
  {
    id: "53164b2b",
    name: "Mathew",
    age: 70,
    children: [
      {
        id: "b14a960c",
        name: "Spencer",
        age: 45,
        children: [
          {
            id: "ff3c260c",
            name: "Joseph",
            age: 22
          },
          {
            id: "7c60920a",
            name: "Robert",
            age: 27,
            children: [
              {
                id: "0e11874f",
                name: "Ian",
                age: 2
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "5a4bdc98",
    name: "Claire",
    age: 63,
    children: [
      {
        id: "014b62a3",
        name: "Adrian",
        age: 41
      },
      {
        id: "a1899541",
        name: "Julie",
        age: 32,
        children: [
          {
            id: "013362a3",
            name: "Patricia",
            age: 4
          }
        ]
      }
    ]
  },
  {
    id: "1a4b4fh98",
    name: "Sergio",
    age: 30,
  }
]

const currArray = [
  {
    id: "23b9dbff",
    name: "Jessie",
    age: 51,
    children: [
      {
        id: "5c0f3094",
        name: "Pedro",
        somekey: "HAHA",
      },
      {
        id: "c1484221",
        name: "Paulo",
        age: 32,
        children: [
          {
            id: "2e6d866e",
            name: "Carol",
            age: 12
          },
          {
            id: "e48a27ad",
            name: "Hester",
            somekey: "Hestersome",
          }
        ]
      },
      {
        id: "8a265c23",
        name: "Hilda",
        age: 25
      }
    ]
  },
  {
    id: "5a4bdc98",
    name: "Claire",
    age: 63,
    children: [
      {
        id: "014b62a3",
        age: 45
      },
      {
        id: "a1899541",
        name: "Julie",
        age: 32,
        children: [
          {
            id: "013362a3",
            name: "Patricia",
            age: 41
          }
        ]
      }
    ]
  },
  {
    id: "514bs4fh4",
    name: "Cindy",
    age: 29,
    children: [
      {
        id: "b13a910c",
        name: "Nicolas",
        age: 1,
      }
    ]
  },
  {
    id: "53164b2b",
    name: "Mateus",
    age: 70,
    children: [
      {
        id: "b14a960c",
        name: "Spencer",
        age: 45,
        children: [
          {
            id: "ff3c260c",
            name: "Jose",
            age: 32
          },
          {
            id: "7c60920a",
            name: "Robert",
            age: 27,
            children: [
              {
                id: "0e11874f",
                name: "Ian",
                age: 2
              }
            ]
          }
        ]
      }
    ]
  }
]

module.exports = {
  prevArray,
  currArray
}
