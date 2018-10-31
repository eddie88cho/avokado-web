package kr.co.avokado.company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class AvokadoCompanyWebApplication {

	@Autowired
	private Environment environment;
	
	public static void main(String[] args) {
		SpringApplication.run(AvokadoCompanyWebApplication.class, args);
	}
	
	@EventListener(ApplicationStartedEvent.class)
	public void onStartUpMessage() {
		String cyan = "\u001B[36m", red="\u001B[31m", reset  = "\u001B[0m";
		String greenBg = "\u001B[42m";
		System.out.println(cyan+"--------------------------------------------------------------");
		System.out.println("      ___   _   _  _____  _   __  ___  ______  _____ ");
		System.out.println("     / _ \\ | | | ||  _  || | / / / _ \\ |  _  \\|  _  |");
		System.out.println("    / /_\\ \\| | | || | | || |/ / / /_\\ \\| | | || | | |");
		System.out.println("    |  _  || | | || | | ||    \\ |  _  || | | || | | |");
		System.out.println("    | | | |\\ \\_/ /\\ \\_/ /| |\\  \\| | | || |/ / \\ \\_/ /");
		System.out.println("    \\_| |_/ \\___/  \\___/ \\_| \\_/\\_| |_/|___/   \\___/ ");
		System.out.println(""+reset);
		System.out.println("     Avokado Company web started ( Active Profile : "+greenBg+red+ environment.getActiveProfiles()[0].toString()+reset +" )");
		System.out.println(cyan+"--------------------------------------------------------------"+reset);
	}
}
