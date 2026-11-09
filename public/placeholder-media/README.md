# Placeholder footage: sources and licence

**Development and staging only.** These clips stand in for the agency's own footage until it is supplied (owner
launch input, design decision L22). Every frame they appear in carries the label
„Примерни стокови кадри · само в тестовата версия“. The production build refuses them: see
`assertMediaAllowed` in `src/content/media.ts`. Never present them as the agency's work.

## Licence

Every clip is from Mixkit under the **Mixkit Stock Video Free License** (https://mixkit.co/license/, "Stock Video Free
License", checked 2026-11-07). The licence allows commercial and non-commercial use without attribution, within
Mixkit's User Terms. Mixkit's **Restricted** licence (personal projects only) does not cover client work. Before adding
a clip, check that its page's JSON-LD shows `"copyrightNotice":"Free"`.

## Clips (all Free, each verified on its own page on 2026-11-07)

| Mixkit id | Clip | Used in |
|---|---|---|
| 810 | Latte art | reel shot 1 (from 10 s); `fmt-product` (from 12 s) |
| 4716 | Mechanic repairing a car engine | reel shot 2 (from 2 s) |
| 43232 | Barber cutting hair with scissors and comb | reel shot 3 (from 2 s) |
| 50017 | Expert pastry chef covering a cake with icing | reel shot 4 (from 6 s); `fmt-process` (from 4 s) |
| 52111 | A young woman wearing a black snugly outfit (gym) | reel shot 5 (from 5 s) |
| 778 | Carpenter marking a piece of wood | reel shot 6 (from 4 s) |
| 3574 | Serving coffee in a cup at a coffee shop | `fmt-bts` (from 3 s) |
| 1973 | A ceramic artist modeling pottery | `fmt-tips` (from 2 s) |
| 52102 | At a pause on her fitness training (gym) | `fmt-team` (from 4 s) |

## Files

- `reel-16x9.mp4`, `reel-9x16.mp4`: the six shots, 2 s each, 12 s in total. They are encoded for scroll scrubbing
  (a keyframe every 2 frames, no B-frames, fast start).
- `fmt-*.mp4`: 3-second vertical loops.
- `*.jpg`: posters.

The rebuild script is `tools/build-media.sh` in the design workspace (`D:/design/hera-editing`).
