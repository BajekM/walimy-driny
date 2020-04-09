export const initialState = {
  drinks: {
    data: [
      {
        name: 'Mohito',
        ingredients: ['pół limonki', '2 łyżeczki cukru brązowego', 'kruszony lód', '60ml rumu', 'woda gazowana'],
        actions: 'stir',
        image: 'https://images.pexels.com/photos/765062/pexels-photo-765062.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        video: 'https://www.youtube.com/embed/9YffrCViTVk',
        carousel: [
          'https://images.pexels.com/photos/3695801/pexels-photo-3695801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          'https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          'https://images.pexels.com/photos/3467149/pexels-photo-3467149.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        ],
      },
    ],
    loading: {
      active: false,
      error: false,
    },
  },

  products: {
    data: [
      {
        name: 'Shaker',
        image: 'https://images.pexels.com/photos/3073970/pexels-photo-3073970.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        description: 'BLAdj hdjhfdskjhfdkjshfdkjshfjk dsfdsfdsdf dsfdsf',
        carousel: [
          'https://images.pexels.com/photos/3695801/pexels-photo-3695801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          'https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          'https://images.pexels.com/photos/3467149/pexels-photo-3467149.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        ],
      },
    ],
    loading: {
      active: false,
      error: false,
    },
  },

  orders: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
};
