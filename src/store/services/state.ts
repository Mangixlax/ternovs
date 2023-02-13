const state = () => ({
  services: [
    {
      category: {
        label: 'Терапия',
        value: 'po-terapii',
      },
      title: 'Услуги по терапии',
      description:
        'Кратко изложить суть направления, а также упомянуть вложенные услуги. Ограничения на кол-во символов нет, но не стоит писать больше 200 символов. Т.к. на телефоне будет много хлама в виде текста.',
      list: [
        {
          image: 'image-1',
          title: 'Лечение кариеса',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services-category-service',
            params: {
              category: 'po-terapii',
              service: 'lechenie-cariesa',
            },
          },
          content: {

          }
        },
        {
          image: 'image-2',
          title: 'Под микроскопом',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services-category-service',
            params: {
              category: 'po-terapii',
              service: 'pod-microscopom',
            },
          },
        },
        {
          image: 'image-3',
          title: 'Реставрация зубов',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services-category-service',
            params: {
              category: 'po-terapii',
              service: 'restavraciya-zubov',
            },
          },
        },
      ],
    },
    {
      category: {
        label: 'Гигиена',
        value: 'po-gigiene',
      },
      title: 'По гигиене',
      description:
        'Кратко изложить суть направления, а также упомянуть вложенные услуги. Ограничения на кол-во символов нет, но не стоит писать больше 200 символов. Т.к. на телефоне будет много хлама в виде текста.',
      list: [
        {
          image: 'image-4',
          title: 'Лечение десен',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services-category-service',
            params: {
              category: 'po-gigiene',
              service: 'lechenie-desen',
            },
          },
        },
        {
          image: 'image-5',
          title: 'Отбеливание зубов',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services-category-service',
            params: {
              category: 'po-gigiene',
              service: 'otbelivanie-zubov',
            },
          },
        },
        {
          image: 'image-6',
          title: 'Гигиена полости рта',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services-category-service',
            params: {
              category: 'po-gigiene',
              service: 'gigiena-polosti-rta',
            },
          },
        },
      ],
    },
    {
      category: {
        label: 'Ортодонтия',
        value: 'po-ortodontii',
      },
      title: 'По ортодонтии',
      description:
        'Кратко изложить суть направления, а также упомянуть вложенные услуги. Ограничения на кол-во символов нет, но не стоит писать больше 200 символов. Т.к. на телефоне будет много хлама в виде текста.',
      list: [
        {
          image: 'image-7',
          title: 'Исправление прикуса элайнерами',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services-category-service',
            params: {
              category: 'po-ortodontii',
              service: 'ispravlenie-prikusa-elainerami',
            },
          },
        },
        {
          image: 'image-8',
          title: 'Исправление c брекет-системамы',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
            route: {
            name: 'services-category-service',
            params: {
              category: 'po-ortodontii',
              service: 'ispravlenie-s-breket-sistemami',
            },
          },
        },
      ],
    },
  ]
})

export type ServicesState = ReturnType<typeof state>

export default state
