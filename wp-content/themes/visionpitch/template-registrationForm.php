<?php
// Template Name: Registration Form
get_header();
?>
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assests/css/style.css">
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assests/css/intlTelInput.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous">
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous">
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://www.jqueryscript.net/demo/jQuery-International-Telephone-Input-With-Flags-Dial-Codes/build/css/intlTelInput.css?v2022">
<script>
    let BASE_URL = '<?php echo site_url(); ?>';
</script>
<script src="https://code.iconify.design/3/3.1.0/iconify.min.js"></script>
<div class="registrationFormPage">
    <div class="formSection ">
        <div class="logoMain">
            <h1>Investment Opportunity</h1>
        </div>
        <div>
            <form method="GET" class="row pt-2   needs-validation px-4 container registrationData" novalidate id="registrationForm">
                <!-- Form Fields -->
                <div class="col-md-6 col-sm-12">
                    <label for="validationCustom01" class="form-label">First Name:</label>
                    <input type="text" class="form-control" id="validationCustom01" name="fname" required>
                    <div class="invalid-feedback">
                        Please Enter The First Name.
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <label for="validationCustom02" class="form-label">Last Name:</label>
                    <input type="text" class="form-control" id="validationCustom02" name="lname" required>
                    <div class="invalid-feedback">
                        Please Enter The Last Name.
                    </div>
                </div>
                <div class="col-md-6 col-sm-12 ">
                    <label for="validationCustomUsername" class="form-label">Email:</label>
                    <div class="input-group has-validation">
                        <input type="email" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" name="email" required>
                        <div class="invalid-feedback">
                            Please Enter Your Email Id.
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <label for="validationCustom03" class="form-label">Mobile Number:</label>
                    <div class="select-box input-group has-validation">
                        <div class="selected-option ">
                            <div>
                                <span class="iconify" data-icon="flag:gb-4x3"></span>
                                <strong>+44</strong>
                            </div>
                            <input type="tel" name="tel" class="form-control" name="phone_num" id="validationCustom03" required>
                        </div>
                        <div class="options">
                            <input type="text" class="search-box" placeholder="Search Country Name">
                            <ol>

                            </ol>
                        </div>
                    </div>
                    <!-- <label for="validationCustom03" class="form-label">Mobile Number:</label>
                    <div class="input-group">
                        <input type="tel" id="phonenumberCustom" name="phone_num" value="" id="validationCustom03" class="form-control"  required>
                    </div> -->
                </div>

                <div class="col-md-12 col-sm-12">
                    <label for="validationCustom04" class="form-label">Organization (optional):</label>
                    <input type="text" class="form-control" id="validationCustom04" name="organisation">
                </div>
                <div class="col-md-12 col-sm-12">
                    <label for="validationCustom04" class="form-label">Message (optional):</label>
                    <textarea class="form-control" id="validationCustom05" rows="3" name="message"></textarea>
                </div>
                <div class="col-12">
                    <div class="form-check d-flex justify-content-between">
                        <div class="fute">
                            <input class="form-check-input" type="checkbox" id="invalidCheck" required>
                            <label class="form-check-label" for="invalidCheck">
                                My information is correct.
                            </label>
                            <div class="invalid-feedback">
                                You must agree before submitting.
                            </div>
                        </div>
                        <button type="button" class="btn btn-sm mx-2 bg-primary text-white px-3" id="nextForTerms" style="display:block" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled>Next</button>
                    </div>
                </div>
                <div class="col-12">
                    <!-- <button class="btn btn-primary btn-md" type="button" name="regulation_submit_btn" id="btnSubmitFor" style="display: none;">Submit</button> -->
                </div>
            </form>
            <div class="otpForm">
                <div class="container">
                    <h1 class="text-center text-black m-0 pt-3 pb-2" style="color:#000;font-size:20px;font-weight:bold">Verify Your Email</h1>
                    <p class="text-center">We have sent a verfication code to<br /> your email id : <span id="getEmailId"></span></p>
                </div>
                <form class="row  needs-validation px-4 container" novalidate id="registrationOtpForm">
                    <div class="col-md-12 col-sm-12">

                        <div class="otp-container flex-column">
                            <div>
                                <!-- <label for="validationCustom01" class="form-label text-center">OTP</label><br /> -->
                            </div>
                            <div class="mb-3 btn d-flex" style="background-color: #0080005c;color: forestgreen;font-weight: 700;">
                                <p class="m-0 pr-2 mr-2" style="font-size: 14px;">Code Expires : </p>
                                <div id="timer" style=" margin-left: 6px; font-size: 14px;"></div>

                            </div>
                        </div>
                        <div class="otp-container">

                            <input type="text" class="otp-input" maxlength="1" oninput="moveToNext(this, 'otp2')" id="otp1">
                            <input type="text" class="otp-input" maxlength="1" oninput="moveToNext(this, 'otp3')" id="otp2">
                            <input type="text" class="otp-input" maxlength="1" oninput="moveToNext(this, 'otp4')" id="otp3">
                            <input type="text" class="otp-input" maxlength="1" oninput="moveToNext(this, 'otp5')" id="otp4">
                            <input type="text" class="otp-input" maxlength="1" oninput="moveToNext(this, 'otp6')" id="otp5">

                        </div>
                        <div class="text-center mt-3">
                            <button class="btn btn-primary" id="submitOtpBtn" type="button">Access Presentation</button>
                        </div>
                        <div class="invalid-feedback">
                            Please Enter the correct otp.
                        </div>
                    </div>
                </form>
            </div>
            <footer class="px-4 py-1">
                <div class="content">
                    <p class="p-0"> @VisioPitch 2024</p>
                    <p class="p-0">adam@visionpitch.com.au</p>
                </div>
                <div class="logoCponnet">
                    <img src="http://localhost/project_demo/wp-content/uploads/Vision-Pitch-logo-white-larger.png" class="img-fluid" alt="Vision-Pitch">
                </div>
            </footer>
        </div>


    </div>
    <div class="bannerSection">
        <img class="img-fluid" src="http://localhost/project_demo/wp-content/uploads/on-hills-central01.jpg" alt="Banner of registration form">
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Terms & Conditions</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>
                        The information contained within this data room ("Data Room") is confidential and is disclosed in
                        strict confidence in connection with the sale of 33 Hull Road, Mount Martha, VIC 3934,



                    </p>
                    <p>By clicking the InstaDocs link, you acknowledge and agree to strictly maintain the confidentiality
                        of all Data Room information and agree to maintain effective control and take all reasonable steps
                        necessary to the keep the information confidential in accordance with the terms and conditions
                        below.</p>
                    <p>
                        With respect to the confidential information provided to you in the Data Room.

                    </p>
                </div>
                <div class="modal-footer">
                    <div class="col-12">
                        <div class="form-check d-flex justify-content-between">
                            <div class="kiuh">
                                <input class="form-check-input" style="margin-right: 7px;" type="checkbox" value="" id="invalidCheckSave" required>
                                <label class="form-check-label" for="invalidCheck">
                                    I agree to the terms and condition.
                                </label>
                                <div class="invalid-feedback">
                                    You must agree before submitting.
                                </div>
                            </div>
                            <div class="buton">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" data-bs-dismiss="modal">Close</button>
                                <!-- <button type="button" class="btn btn-success" data-bs-dismiss="modal" id="DoneforOtp">Next</button> -->
                                <button class="btn btn-primary btn-md" type="button" name="regulation_submit_btn" data-bs-dismiss="modal" data-dismiss="modal" id="btnSubmitFor" disabled>Next</button>

                            </div>
                            <!-- <button type="button" class="btn btn-sm mx-2 bg-primary text-white px-3" id="nextForTerms" data-bs-toggle="modal" data-bs-target="#exampleModal">Next</button> -->
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

<script src="<?php echo get_template_directory_uri(); ?>/assests/js/script.js"></script>
<!-- <script src="<?php //echo get_template_directory_uri(); 
                    ?>/assests/js/intlTelInputWithUtils.js"></script> -->
<!-- <script>
    var inputOr = document.querySelector("#phonenumberCustom");
    // alert(inputOr)
    window.intlTelInput(inputOr,{})
</script> -->
<script>
    document.getElementById('invalidCheckSave').addEventListener('change', function() {
        var submitBtn = document.getElementById('btnSubmitFor');
        submitBtn.disabled = !this.checked;
    });
    document.getElementById('invalidCheck').addEventListener('change', function() {
        var submitBtn = document.getElementById('nextForTerms');
        submitBtn.disabled = !this.checked;
    });
</script>
<script>
    const input = document.querySelector("#phonenumberCustom");
    console.log(input.value)
    const iti = window.intlTelInput(input, {
        // allowDropdown: false,
        // autoPlaceholder: "off",
        // containerClass: "test",
        // countryOrder: ["jp", "kr"],
        // countrySearch: false,
        // customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
        //   return "e.g. " + selectedCountryPlaceholder;
        // },
        // dropdownContainer: document.querySelector('#custom-container'),
        // excludeCountries: ["us"],
        // fixDropdownWidth: false,
        // formatAsYouType: false,
        // formatOnDisplay: false,
        // geoIpLookup: function(callback) {
        //   fetch("https://ipapi.co/json")
        //     .then(function(res) { return res.json(); })
        //     .then(function(data) { callback(data.country_code); })
        //     .catch(function() { callback(); });
        // },
        // hiddenInput: () => "phone_full",
        // i18n: { 'de': 'Deutschland' },
        initialCountry: "us",
        // nationalMode: false,
        // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
        // placeholderNumberType: "MOBILE",
        // showFlags: false,
        // separateDialCode: true,
        // strictMode: true,
        // useFullscreenPopup: true,
        // utilsScript: "/build/js/utils.js", // leading slash (and http-server) required for this to work in chrome
        // validationNumberType: null,
    });
    window.iti = iti; // useful for testing
</script>
<script>
    $(document).ready(function() {
        $(".otpForm").hide();

        // $("#invalidCheck").click(function() {
        //     $("#nextForTerms").toggle();
        // });
        $("#DoneforOtp").click(function() {
            $("#btnSubmitFor").toggle();
        });
        $("#btnSubmitFor").click(function() {
            let emailIdName = $('input[name="email"]').val();
            document.getElementById("getEmailId").innerHTML = emailIdName;

        });

        let generatedOtp = generateOTP();

        function generateOTP() {
            // Declare a digits variable 
            // which stores all digits  
            let digits = '0123456789';
            let OTP = '';
            let len = digits.length;
            for (let i = 0; i < 5; i++) {
                OTP += digits[Math.floor(Math.random() * len)];
            }
            return OTP;
        }

        $("#btnSubmitFor").click(function() {
            var forms = document.querySelectorAll('.needs-validation');
            var allFormsValid = true;
            Array.prototype.slice.call(forms).forEach(function(form) {
                if (!form.checkValidity()) {
                    allFormsValid = false;
                    form.classList.add('was-validated');
                }
            });
            if (allFormsValid) {
                $(".otpForm").show();
                $(".registrationData").hide();
                console.log('Generated OTP:', generatedOtp); // Log the generated OTP
            }
        });

        window.moveToNext = function(current, nextFieldID) {
            if (current.value.length === 1 && nextFieldID !== '') {
                document.getElementById(nextFieldID).focus();
            }
        };

        $('.dropdown-menu a').on('click', function(event) {
            event.preventDefault();
            var selectedCode = $(this).text();
            $('#countryCodeBtn').text(selectedCode);
        });

        $("#submitOtpBtn").click(function() {
            var otpInputs = document.querySelectorAll('.otp-container .otp-input');
            var otpValues = '';
            otpInputs.forEach(function(input) {
                otpValues += input.value;
            });

            console.log('Entered OTP:', typeof(otpValues));
            console.log('Generated OTP:', typeof(generatedOtp));

            if (otpValues === "90782") {
                var formData = {
                    fname: $('input[name="fname"]').val(),
                    lname: $('input[name="lname"]').val(),
                    email: $('input[name="email"]').val(),
                    country_code: $('#countryCodeBtn').text().replace('+', ''),
                    phone_num: $('input[name="phone_num"]').val(),
                    organisation: $('input[name="organisation"]').val(),
                    message: $('textarea[name="message"]').val(),
                    agree: $('#invalidCheck').is(':checked') // Returns true or false
                };

                // console.log('Form Data:', formData);

                $.ajax({
                    type: "POST",
                    url: BASE_URL + "/wp-admin/admin-ajax.php",
                    data: {
                        action: "registrationFormData",
                        optionvalue: formData
                    },
                    success: function(response) {
                        // Show OTP form upon successful response
                        alert("Thank You for registration");
                        window.location.href = BASE_URL + "/start/";
                    },
                    error: function(error) {
                        alert("An error occurred. Please try again.");
                    }
                });
            } else {
                alert("Incorrect OTP. Please try again.");
            }
        });

        console.log("Generated OTP of 5 digits: ", generatedOtp);
    });
    $(document).ready(function() {
        var duration = 5 * 60; // 2 minutes in seconds
        var display = $('#timer');
        var submitButton = $('#submitOtpBtn');

        function startTimer() {
            var timer = duration,
                minutes, seconds;
            var interval = setInterval(function() {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.text(minutes + ":" + seconds);

                if (--timer < 0) {
                    clearInterval(interval);
                    submitButton.prop('disabled', true);
                }
            }, 1000);
        }

        startTimer();
    });
</script>

<?php
get_footer();
?>