import { mount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import InputSearch from '@/components/InputSearch.vue';
import CardHome from '@/components/CardHome.vue';
import { nextTick } from 'vue';

describe('HomeComponent.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HomeComponent, {
      components: {
        InputSearch,
        CardHome
      },
      global: {
        stubs: {
          HomeIcon: true,
          PlusIcon: true
        }
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('devrait initialiser la liste des maisons depuis le localStorage', async () => {
    const mockHomeList = [
      { type: 'Maison 1', availability: true, priceHome: 1000 },
      { type: 'Maison 2', availability: false, priceHome: 2000 }
    ];
    localStorage.setItem('homeList', JSON.stringify(mockHomeList));
    await wrapper.vm.$nextTick();

    const homeCards = wrapper.findAllComponents(CardHome);
    expect(homeCards.length).toBe(mockHomeList.length);
    expect(homeCards[0].props().type).toBe(mockHomeList[0].type);
    expect(homeCards[1].props().type).toBe(mockHomeList[1].type);
  });

  it('doit ouvrir le modal pour ajouter une nouvelle maison', async () => {
    const openAddModalSpy = jest.spyOn(wrapper.vm, 'openAddModal');
    const addButton = wrapper.find('button');
    await addButton.trigger('click');

    expect(openAddModalSpy).toHaveBeenCalled();
    const modal = document.getElementById('my_modal_3');
    expect(modal).toBeTruthy();
  });

  it('doit filtrer la liste des maisons avec la recherche', async () => {
    wrapper.setData({
      homeList: [
        { type: 'Maison A', availability: true, priceHome: 1000 },
        { type: 'Maison B', availability: false, priceHome: 2000 }
      ]
    });

    const inputSearch = wrapper.findComponent(InputSearch);
    await inputSearch.vm.$emit('search', 'Maison A');
    await nextTick();

    const filteredHomes = wrapper.vm.filteredHomes;
    expect(filteredHomes.length).toBe(1);
    expect(filteredHomes[0].type).toBe('Maison A');
  });

  it('devrait ajouter une nouvelle maison lors de la soumission du formulaire', async () => {
    wrapper.vm.currentHome.type = 'Nouvelle Maison';
    wrapper.vm.currentHome.priceHome = 3000;

    wrapper.vm.handleSubmit();
    await nextTick();

    expect(wrapper.vm.homeList.length).toBe(1);
    expect(wrapper.vm.homeList[0].type).toBe('Nouvelle Maison');
    expect(wrapper.vm.homeList[0].priceHome).toBe(3000);
  });

  it('doit ouvrir le modal d\'édition pour une maison existante', async () => {
    wrapper.setData({
      homeList: [
        { type: 'Maison A', availability: true, priceHome: 1000 },
        { type: 'Maison B', availability: false, priceHome: 2000 }
      ]
    });

    const cardHome = wrapper.findComponent(CardHome);
    await cardHome.vm.$emit('edit-home', 0);
    await nextTick();

    expect(wrapper.vm.editMode).toBe(true);
    expect(wrapper.vm.currentHome.type).toBe('Maison A');
  });
});
