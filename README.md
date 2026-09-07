# RAFC Connect

Build a React Native mobile app for Randburg Association Football Club (RAFC) based in Randburg, Johannesburg, South Africa.

Brand colours:
Primary: Navy #001039, Gray #666666
Secondary: Silver #DDDDDD, White #FFFFFF
Away kit accent: Green #2D7D32 (used sparingly to pop against the navy)

Do NOT use Supabase. This project uses Firebase (Firestore, Auth, Storage, FCM). Do not scaffold any Supabase config or authentication. I will wire all backend connections manually.

Design the following screens first:

Home screen — Club hero banner with RAFC crest, upcoming fixture card, latest result, training schedule teaser, sponsor logo strip at the bottom, news/announcements section

League hub — 8 league cards (RCLFA U6–U12, RCLFA U13–U19, Championship, GDL MySAFA, Ladies RCLFA, Ladies Regional SAFA, League 7, League 8) each with the league name, a coloured accent, and a tap-through to the league detail

League detail screen — tabs for Squad, Fixtures, Results, Training. Squad shows player cards with jersey number and position. Fixtures shows upcoming matches. Results shows recent scores and league table.

Bottom navigation — Home, Leagues, Fixtures, Notifications, Profile

Make it feel premium, clean and modern — similar to the Premier League app or the SuperSport app. Heavy use of the navy with white text. The green accent should appear on key CTAs and highlights only.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fd6be41e-d5e5-4a94-98db-2bf976ccfd0f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
