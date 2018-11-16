import { shallowMount } from '@vue/test-utils';
import TargetPace from '@/components/TargetPace.vue';

describe('TargetPace.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(TargetPace, {
      propsData: {
        fiveKmRaceTime: '21:30',
        runTypeCode: 'EasyRun',
      },
    });
    expect(wrapper.text()).toMatch('10:03-11:40');
  });
});
