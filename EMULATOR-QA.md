# Firmware verification

BUSY Bar Emulator 0.1.0-beta.5, firmware 1.3.1.

Verified draft, palette and phase editing, saving and browsing a gallery piece. Observed the orange diamond and teal twill patterns on the front and the gallery on the back. Back exited cleanly (72.7 KiB peak).

The app was typechecked, built, installed and exercised on the emulator. Native captures are under screenshots/. The tested installable archive is in packages/.

Reopened the saved gallery on firmware and verified its browsing, editing and exit instructions on the rear display.

Firmware motion pass: up, ok, start. 10 distinct frames in the controls recording. App io.ncoooooper.pixelloom exited: finished; heap peak 83.1 of 128 KiB.

## Display capture

Firmware 1.3.1 rendered both README examples. Each square in a guide GIF is one front LED in a 16 × 16 cell. The production archive was built from the source in this repository.

## Screen transition capture

Firmware 1.3.1 rendered the display sequences in the README. The release archive also ran on a fresh emulator with rapid wheel reversals and Back during a transition. The guide uses a 14 × 14 lit area inside each 16 × 16 cell. Input sequences, frame counts and the release archive checksum are in [the capture record](media/screen-transitions.json).
