<?php
$email = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];

$EmailTo = "biuro@horyzontgeodezja.pl";
$MailSubject = "Nowa wiadomość horyzontgeodezja.pl";

// prepare email body text
$Body .= "Mail: ";
$Body .= $email;
$Body .= "\n";

$Body .= "Temat: ";
$Body .= $subject;
$Body .= "\n";

$Body .= "Wiadomość: ";
$Body .= $message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $MailSubject, $Body, "From: biuro@horyzontgeodezja.pl");

// redirect to success page
if ($success){
	echo "Dziękujemy, Twoja wiadomość została wysłana!";
}else{
	echo "Ups... Coś poszło nie tak. Napisz do nas maila - biuro@horyzontgeodezja.pl";
}

?>
