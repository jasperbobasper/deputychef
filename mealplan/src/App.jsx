import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import fetchUserRecipes from './util/fetchUserRecipes';

import LoadingPage from './pages/LoadingPage';
import EditRecipePage from './pages/EditRecipePage';
import RecipePage from './pages/RecipePage';
import AllRecipesPage from './pages/AllRecipesPage';
import userContext from './util/userContext';
import HomePage from './pages/HomePage';
import MealPlanPage from './pages/MealPlanPage';
import SettingsPage from './pages/Settings';

import Navbar from './pages/Navbar';
import { Container } from '@mui/material';
import theme from './util/colorTheme';

import AddRecipePage from './pages/AddRecipePage';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import EditIngredients from './components/EditIngredients';
import fetchMealPlan from './util/fetchMealPlan';
import { ThemeProvider } from '@mui/material/styles';
import SignInPage from './pages/SignInPage';

function App() {
  const [user, setUser] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const callbackLoading = (newData, setVal) => {
    setLoading(true);
    setVal(newData);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setLoading(false);
        setAuthUser(user);
        if (user) {
          getDoc(doc(db, "users", user.uid))
          .then((snap) => {
            setUser({
              ...snap.data(),
              uid: user.uid,
            });
          })
          .catch((error) => {
            console.log(error);
          });
        } else {
          setLoading(false);
          setAuthUser(null);
          setUser(null);
        }
      }); 
      return () => unsubscribe();
    }, [auth])

    useEffect(() => {
      if (authUser) {
        fetchUserRecipes(authUser.uid)
          .then((res) => setRecipes(res))
          .catch((e) => console.log(e));
        fetchMealPlan(authUser.uid)
          .then((res) => setMealPlan(res))
          .catch((e) => console.log(e));
      }
    }, [authUser]);

    useEffect(() => {
      setLoading(false);
    }, [user, recipes, mealPlan]);

  if (loading) {
    return (
        <LoadingPage />
    );
  }
  if (authUser) {
    if (!user) {
      return <LoadingPage />
    }
    return (
      <Router>
        <userContext.Provider value={user}>
          <ThemeProvider theme={theme}>
            <Navbar disabled={user.firstLogin}>
              <Container component="main" sx={{mt: "110px", bgcolor: "background"}}>
              {(!recipes || !mealPlan) ? (
                <LoadingPage />
              ) : 
                <Routes>
                  <Route path="/" element={<HomePage recipes={recipes} setRecipes={setRecipes} mealPlan={mealPlan} setMealPlan={setMealPlan} setUser={setUser}/>}/>
                  <Route path="/recipes" element={<AllRecipesPage recipes={recipes} setRecipes={setRecipes} setUser={setUser} callbackLoading={callbackLoading}/>}/>
                  <Route path="/recipes/add" element={<AddRecipePage recipes={recipes} setRecipes={setRecipes} callbackLoading={callbackLoading}/>}/>
                  <Route path="/recipes/:id" element={<RecipePage recipes={recipes} setRecipes={setRecipes} callbackLoading={callbackLoading}/>}/>
                  <Route path="/recipes/:id/:servings" element={<RecipePage recipes={recipes} setRecipes={setRecipes} callbackLoading={callbackLoading}/>}/>
                  <Route path="/recipes/ingredients/:id" element={<EditIngredients />}/>
                  <Route path="/recipes/edit/:id" element={<EditRecipePage recipes={recipes} setRecipes={setRecipes} callbackLoading={callbackLoading}/>}/>
                  <Route path="/mealplan" element={<MealPlanPage recipes={recipes} setRecipes={setRecipes} mealPlan={mealPlan} setMealPlan={setMealPlan} callbackLoading={callbackLoading}/>}/>
                  <Route path="/settings" element={<SettingsPage setUser={setUser} callbackLoading={callbackLoading} recipes={recipes} />}/>
                </Routes>
              }
              </Container>
            </Navbar>
          </ThemeProvider>
        </userContext.Provider>
      </Router>
    );
  } else {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Container disableGutters component="main" sx={{height: "100%", overflow: "hidden"}}>
            <Routes>
              <Route path="/" element={<SignInPage />}/>
              <Route path="/:page" element={<SignInPage />}/>
            </Routes>
          </Container>
        </ThemeProvider>
    </Router>
    );
  }
}

export default App;
