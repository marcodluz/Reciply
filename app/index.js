import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";

export default function Page() {
  // return <Redirect href={'/home/panel'} />

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      <View style={styles.main}>
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/recipeapp-3914c.appspot.com/o/splash-image.png?alt=media&token=a376dcdf-93f7-4d36-bb97-2e48fd12accb",
          }}
          style={styles.splashImage}
        />
        <Text style={styles.title}>Reciply</Text>
        <Text style={styles.subtitle}>Reduce Waste, Cook with Taste!</Text>

        <TouchableOpacity
          onPress={() => {
            router.push("login");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        {/* <Link
          href={{ pathname: "/panel", params: { username: "Marco" } }}
          style={styles.link}
        >
          Panel
        </Link> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgb(24, 23, 30)",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    alignItems: "center",
  },
  title: {
    fontSize: 55,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 19,
    color: "rgb(200, 200, 200)",
    marginTop: 10,
  },
  splashImage: {
    width: 200,
    height: 200,
    marginBottom: 150,
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: "100%",
    marginTop: 50,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
});
