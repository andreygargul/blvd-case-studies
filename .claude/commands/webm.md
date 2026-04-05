Convert a video file to a high-quality WebM for website use.

## Steps

1. The user will provide a video file path (or ask them for it if not provided).

2. Ask the following questions **all at once in a single message**:
   - **Output filename** — what should the output file be named? (default: same name as input with `.webm` extension, saved in the same directory)
   - **Quality** — choose a preset:
     - `high` (CRF 10, visually lossless, larger file)
     - `balanced` (CRF 18, default, great for web)
     - `small` (CRF 28, smaller file, slight quality loss)
   - **Strip audio?** — yes/no (default: yes, since website demos rarely need audio)
   - **Scale to 2x?** — if the source was recorded on a non-Retina display, do you want to double the resolution? (default: no)

3. Check that `ffmpeg` is installed. If not, tell the user to run `brew install ffmpeg` and stop.

4. Build and run the ffmpeg command based on answers:

   Base command (VP9, high quality):
   ```
   ffmpeg -i <input> -c:v libvpx-vp9 -crf <crf> -b:v 0 [-vf scale=iw*2:ih*2] [-an] <output>
   ```

   CRF values: high=10, balanced=18, small=28

5. After conversion, report:
   - Input file size
   - Output file size
   - Output file path
   - The exact ffmpeg command used (so the user can rerun or tweak it)
