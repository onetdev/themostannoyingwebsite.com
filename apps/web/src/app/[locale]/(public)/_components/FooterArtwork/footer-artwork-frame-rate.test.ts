import { createFrameRateSampler } from './footer-artwork-frame-rate';

const FRAME_60 = 1000 / 60;
const FRAME_120 = 1000 / 120;

describe('createFrameRateSampler', () => {
  it('reports zero until there are two samples', () => {
    const sampler = createFrameRateSampler();

    expect(sampler.read()).toBe(0);
    sampler.record(0);
    expect(sampler.read()).toBe(0);
  });

  it('measures a 60hz cadence', () => {
    const sampler = createFrameRateSampler();

    for (let index = 0; index <= 60; index += 1) {
      sampler.record(index * FRAME_60);
    }

    expect(sampler.read()).toBeCloseTo(60, 0);
  });

  it('measures a 120hz cadence', () => {
    const sampler = createFrameRateSampler();

    for (let index = 0; index <= 120; index += 1) {
      sampler.record(index * FRAME_120);
    }

    expect(sampler.read()).toBeCloseTo(120, 0);
  });

  it('drops samples outside the rolling window', () => {
    const sampler = createFrameRateSampler({ windowMs: 500 });

    for (let index = 0; index <= 200; index += 1) {
      sampler.record(index * FRAME_60);
    }

    expect(sampler.read()).toBeCloseTo(60, 0);
  });

  it('starts a new window after a pause', () => {
    const sampler = createFrameRateSampler({ gapMs: 250 });

    for (let index = 0; index <= 60; index += 1) {
      sampler.record(index * FRAME_60);
    }

    // A hidden tab / offscreen pause, then a slower 30hz resume.
    sampler.record(5000);

    for (let index = 1; index <= 30; index += 1) {
      sampler.record(5000 + index * (1000 / 30));
    }

    expect(sampler.read()).toBeCloseTo(30, 0);
  });

  it('resets on demand', () => {
    const sampler = createFrameRateSampler();

    sampler.record(0);
    sampler.record(FRAME_60);
    sampler.reset();

    expect(sampler.read()).toBe(0);
  });
});
