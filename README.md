# Dashboard App

A basic multi-page dashboard with roles and permissions, deployable on GitHub Pages.

## Roles & Demo Users

- Product Owner: `po` / `po123`
- Team Lead: `tl` / `tl123`
- Project Manager: `pm` / `pm123`
- Engineering Manager: `em` / `em123`

## Getting Started

1. **Clone & open in VS Code:**
    ```
    git clone https://github.com/Festchi-Studio/Dash1.git
    cd Dash1
    code .
    ```

2. **Install dependencies:**
    ```
    npm install
    ```

3. **Run locally:**
    ```
    npm run dev
    ```
    Go to [http://localhost:5173](http://localhost:5173)

4. **Deploy to GitHub Pages:**
    - Update `"homepage"` in `package.json` if needed.
    - Build & deploy:
      ```
      npm run deploy
      ```
    - Visit: https://Festchi-Studio.github.io/Dash1

## File Structure

- `src/components/`: Pages and UI components
- `src/auth/`: Authentication logic
- `src/roles.js`: Role and demo user definitions

## Customization

- Update roles/users in `src/roles.js` as needed.
- Replace in-memory auth with backend or OAuth for production use.
