"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import React, { useContext, useEffect, useState } from "react";

function Provider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      let { data: Users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user?.email);

      console.log(Users);
      if (Users?.length == 0) {
        // await supabase.from("Users").insert([
        //   {
        //     name: user?.user_metadata?.name,
        //     email: user?.email,
        //     picture: user?.user_metadata?.picture,
        //   },
        // ]);
        // console.log(data);
        // setUser({
        //   name: user?.user_metadata?.name,
        //   email: user?.email,
        //   picture: user?.user_metadata?.picture,
        // });

        const { data: newUserData, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              name: user?.user_metadata?.name,
              email: user?.email,
              picture: user?.user_metadata?.picture,
            },
          ])
          .select()
          .single();

        if (insertError) {
          console.error("Insert error:", insertError);
        } else {
          setUser(newUserData);
        }

        return;
      }
      setUser(Users[0]);
    });
  };
  return (
    <div>
      <UserDetailContext.Provider value={{ user, setUser }}>
        {children}
      </UserDetailContext.Provider>
    </div>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
