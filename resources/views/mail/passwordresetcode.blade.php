<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                        <!-- Header Section -->
                        <tr>
                            <td bgcolor="#3498db" style="padding: 20px; text-align: center; color: #ffffff; font-size: 24px;">
                                Password Reset
                            </td>
                        </tr>

                        <!-- Content Section -->
                        <tr>
                            <td style="padding: 20px;">
                                <p>Hello {{ $name }},</p>
                                <p>We received a request to reset your password. To complete the process, please use the following 6-digit pin code:</p>
                                <p style="font-size: 28px; font-weight: bold; color: #3498db;">{{ $code }}</p>
                                <p>This pin code is valid for a short period. Please use it as soon as possible to reset your password.</p>
                                <p>If you did not request a password reset, please ignore this email.</p>
                            </td>
                        </tr>

                        <!-- Footer Section -->
                        <tr>
                            <td bgcolor="#3498db" style="padding: 20px; text-align: center; color: #ffffff; font-size: 14px;">
                                &copy; 2023 Kojitation. All rights reserved.
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

    </body>
</html>
