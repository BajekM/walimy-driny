export const initialState = {
  user: {
    data: '',
    loading: {
      active: false,
      error: false,
    },
  },
  drinks: {
    data: [
      // {
      //   name: 'Mohito',
      //   ingredients: ['pół limonki', '2 łyżeczki cukru brązowego','kilka listków mięty', 'kruszony lód', '60ml rumu', 'woda gazowana'],
      //   actions: ['Pokrój limonkę na kawałki i wrzuć do szklanki', 'Dodaj cukier i zgniataj moździeżem', 'Dodaj listki mięty i delikatnie zgnięć moździeżem', 'Dodaj kruszony lód', 'Wlej rum', 'Dopełnij wodą gazowaną i wymieszaj'],
      //   image: 'https://images.pexels.com/photos/765062/pexels-photo-765062.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //   video: 'https://www.youtube.com/embed/9YffrCViTVk',
      //   carousel: [
      //     'https://images.pexels.com/photos/3695801/pexels-photo-3695801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //     'https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //     'https://images.pexels.com/photos/3467149/pexels-photo-3467149.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      //   ],
      //   tags: ['long', 'strong', 'shot'],
      // },
      // {
      //   name: 'Mohito',
      //   ingredients: ['pół limonki', '2 łyżeczki cukru brązowego', 'kruszony lód', '60ml rumu', 'woda gazowana'],
      //   actions: 'stir',
      //   image: 'https://images.pexels.com/photos/765062/pexels-photo-765062.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //   video: 'https://www.youtube.com/embed/9YffrCViTVk',
      //   carousel: [
      //     'https://images.pexels.com/photos/3695801/pexels-photo-3695801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //     'https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //     'https://images.pexels.com/photos/3467149/pexels-photo-3467149.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      //   ],
      //   tags: ['long', 'strong'],
      // },
      // {
      //   name: 'Mohito',
      //   ingredients: ['pół limonki', '2 łyżeczki cukru brązowego', 'kruszony lód', '60ml rumu', 'woda gazowana'],
      //   actions: 'stir',
      //   image: 'https://images.pexels.com/photos/765062/pexels-photo-765062.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //   video: 'https://www.youtube.com/embed/9YffrCViTVk',
      //   carousel: [
      //     'https://images.pexels.com/photos/3695801/pexels-photo-3695801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //     'https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //     'https://images.pexels.com/photos/3467149/pexels-photo-3467149.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      //   ],
      //   tags: ['long', 'strong', 'sweet', 'shot'],
      // },
      // {
      //   name: 'Mohito',
      //   ingredients: ['pół limonki', '2 łyżeczki cukru brązowego', 'kruszony lód', '60ml rumu', 'woda gazowana'],
      //   actions: 'stir',
      //   image: 'https://images.pexels.com/photos/765062/pexels-photo-765062.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //   video: 'https://www.youtube.com/embed/9YffrCViTVk',
      //   carousel: [
      //     'https://images.pexels.com/photos/3695801/pexels-photo-3695801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //     'https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //     'https://images.pexels.com/photos/3467149/pexels-photo-3467149.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      //   ],
      //   tags: ['long', 'strong'],
      // },
      // {
      //   name: 'Mohito',
      //   ingredients: ['pół limonki', '2 łyżeczki cukru brązowego', 'kruszony lód', '60ml rumu', 'woda gazowana'],
      //   actions: 'stir',
      //   image: 'https://images.pexels.com/photos/765062/pexels-photo-765062.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //   video: 'https://www.youtube.com/embed/9YffrCViTVk',
      //   carousel: [
      //     'https://images.pexels.com/photos/3695801/pexels-photo-3695801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //     'https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //     'https://images.pexels.com/photos/3467149/pexels-photo-3467149.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      //   ],
      //   tags: ['long', 'strong'],
      // },
      // {
      //   name: 'Mohitohgfhg',
      //   ingredients: ['pół limonki', '2 łyżeczki cukru brązowego', 'kruszony lód', '60ml rumu', 'woda gazowana'],
      //   actions: 'stir',
      //   image: 'https://images.pexels.com/photos/765062/pexels-photo-765062.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //   video: 'https://www.youtube.com/embed/9YffrCViTVk',
      //   carousel: [
      //     'https://images.pexels.com/photos/3695801/pexels-photo-3695801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //     'https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //     'https://images.pexels.com/photos/3467149/pexels-photo-3467149.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      //   ],
      //   tags: ['long', 'strong'],
      // },
      // {
      //   name: 'Mohito',
      //   ingredients: ['pół limonki', '2 łyżeczki cukru brązowego', 'kruszony lód', '60ml rumu', 'woda gazowana'],
      //   actions: 'stir',
      //   image: 'https://images.pexels.com/photos/765062/pexels-photo-765062.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //   video: 'https://www.youtube.com/embed/9YffrCViTVk',
      //   carousel: [
      //     'https://images.pexels.com/photos/3695801/pexels-photo-3695801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //     'https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      //     'https://images.pexels.com/photos/3467149/pexels-photo-3467149.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      //   ],
      //   tags: ['long', 'strong'],
      // },
    ],
    loading: {
      active: false,
      error: false,
    },
  },

  products: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },

  orders: {
    data: [],
    basket: '',
    loading: {
      active: false,
      error: false,
    },
  },
  tags: [],
};
