import java.io.FileWriter;
import java.io.IOException;

import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class CharacterGenerator {
	private static final String[] characters = new String[] {
		"Isabelle", "Villager", "Bayonetta", "Simon", "Diddy Kong", "Donkey Kong", "King K. Rool",
		"Duck Hunt", "Lucas", "Ness", "Captain Falcon", "Cloud", "Chrom", "Corrin", "Ike", "Lucina",
		"Marth", "Robin", "Roy", "Mr. Game & watch", "Ice Climbers", "Dark Pit", "Palutena", "Pit",
		"King Dedede", "Kirby", "Meta Knight", "Bowser", "Bowser Jr.", "Daisy", "Dr. Mario", "Luigi",
		"Mario", "Peach", "Piranha Plant", "Rosalina & Luma", "Mega Man", "Snake", "Dark Samus", "Ridley",
		"Samus", "Zero Suit Samus", "Pac Man", "Joker", "Olimar", "Olimar", "Inkling", "Greninja", 
		"Incineroar", "Jiggly Puff", "Lucario", "Mewtwo", "Pichu", "Pikachu", "Ivysaur", "Squirtle",
		"Charizard", "Pokemon Trainer", "Little Mac", "R.O.B.", "Sonic", "Falco", "Fox", "Wolf", "Ken", 
		"Ryu", "Mii Brawler", "Mii Gunner", "Mii Swordfighter", "Wario", "Shulk", "Yoshi", "Ganondorf", 
		"Link", "Sheik", "Toon Link", "Young Link", "Zelda"
	};
	
	public static void main(String[] args) throws IOException {
		JSONObject object = new JSONObject();
		String baseLink = "https://rankedboost.com/super-smash-bros/"; 
		JSONArray array = new JSONArray();
		for(int i = 0; i < characters.length; i++) {
			JSONObject curr = new JSONObject();
			String link = createLink(characters[i], baseLink);
			Document doc = Jsoup.connect(link).get();
			String tier = doc.select(".badge-text-above").get(1).text();
			
			curr.put("name", characters[i]);
			curr.put("image", "");
			curr.put("universe", doc.select(".badge-text-above").first().text());
			
			curr.put("tier", tier.substring(0, 1));
			curr.put("weight", getStat(doc.select(".hor_line").get(0).toString()));
			curr.put("air_speed", getStat(doc.select(".hor_line").get(1).toString()));
			curr.put("fall_speed", getStat(doc.select(".hor_line").get(2).toString()));
			curr.put("run_speed", getStat(doc.select(".hor_line").get(3).toString()));
			curr.put("dash_speed", getStat(doc.select(".hor_line").get(4).toString()));
			
			// unlock
			JSONArray unlock = new JSONArray();
			Elements result = doc.select(".generic-li");
			unlock.put(new JSONObject().put("wofl", getUnlockMethod(result.get(0).text())));
			unlock.put(new JSONObject().put("classic_mode", getUnlockMethod(result.get(1).text())));
			unlock.put(new JSONObject().put("vs_mode", getUnlockMethod(result.get(2).text())));
			
			// Spirits
			JSONArray spirits = new JSONArray();
			Elements spiritList = doc.select(".th-extra");
			spirits.put(new JSONObject().put("primary", getSpirit(spiritList, 1)));
			spirits.put(new JSONObject().put("slot_1", getSpirit(spiritList, 3)));
			spirits.put(new JSONObject().put("slot_2", getSpirit(spiritList, 5)));
			spirits.put(new JSONObject().put("slot_3", getSpirit(spiritList, 7)));
			
			// 
			// Moves
			// to be generated later



			curr.put("unlock", unlock);
			curr.put("spirits", spirits);
			System.out.println((i+1) + " / " + characters.length );
			array.put(curr);
		}
		System.out.println("Character Generation Complete...");
		System.out.println("Writing to characters.json........");
		
		object.put("character", array);
		try(FileWriter file = new FileWriter("./characters.json")) {
			file.write(object.toString());
			System.out.println("Copied to characters.json");
		}
		
	}
	
	public static String getUnlockMethod(String str) {
		String result = "";
		for(int i = str.indexOf("-") + 2; i < str.length(); i++ ) {
			result += str.charAt(i);
		}
		if(result.length() == 0) {
			return "-";
		}
		return result;
	}
	
	/**
	 * Get Stats from the calc function in the width attribute of a 
	 * html tag of this format: 
	 *   "<div class="hor_line maxcp" style="width:calc(75% - 2px);">"
	 * @param html
	 * @return
	 *   the int value parsed from the calc function in the width attribute
	 */
	public static int getStat(String html) {
		// retrieves number from this html tag
		//<div class="hor_line maxcp" style="width:calc(75% - 2px);"></div>
		//<div class="hor_line maxcp" style="width:calc(71.487603305785% - 2px);"></div>
		
		String result = "";
		for(int i = html.indexOf("("); i < html.length(); i++) {
			if(html.charAt(i) == '%' || html.charAt(i) == '.') {
				result+= html.substring(html.indexOf("(") + 1, i);
				return Integer.parseInt(result);
			}
		}
		return -1;
	}
	
	
	/**
	 * Generate a valid link 
	 * @param input
	 * @param baseLink
	 * @return
	 *  valid link
	 */
	public static String createLink(String input, String baseLink) {
		
		String str = input.toLowerCase();
		
		// remove & from string
		if(str.indexOf("&") != -1) {
			str = str.replace(" & ", " ");
		}
		
		// jiggly puff doesnt follow the same pattern
		if(input == "Jiggly Puff") {
			return baseLink + "jigglypuff";
		}
		
		// remove dots and replace spaces with -
		for(int i = 0; i < str.length(); i++) {
			if(str.charAt(i) == '&' || str.charAt(i) == '.') {
				continue;
			} 
			else if(str.charAt(i) == ' ') {
				baseLink += "-";
			}
			else {
				baseLink += str.charAt(i);
			}
		}
		
		return baseLink;
	}
	
	public static String getSpirit(Elements spiritList, int position){
		String result = spiritList.get(position).text();
		if(result.length() == 0) {
			return "-";
		}
		return result;
	}
}

